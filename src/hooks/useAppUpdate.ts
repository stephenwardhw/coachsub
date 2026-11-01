import { useEffect, useState, useCallback } from 'react';

export function useAppUpdate() {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    // Listen for controllerchange to reload when updated
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });

    navigator.serviceWorker.ready.then((registration) => {
      // Check if there is already a waiting worker
      if (registration.waiting) {
        setWaitingWorker(registration.waiting);
        setIsUpdateAvailable(true);
        setUpdateStatus('Update available! Tap to reload.');
      }

      // Detect when a new update is found
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            setWaitingWorker(newWorker);
            setIsUpdateAvailable(true);
            setUpdateStatus('New version ready to install!');
          }
        });
      });
    }).catch(() => {});
  }, []);

  const checkForUpdates = useCallback(async () => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      setUpdateStatus('App updates only available in PWA / browser with Service Worker.');
      return;
    }

    setIsChecking(true);
    setUpdateStatus('Checking for updates...');

    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.update();

      // Check if update is waiting
      if (registration.waiting) {
        setWaitingWorker(registration.waiting);
        setIsUpdateAvailable(true);
        setUpdateStatus('New update found! Ready to install.');
      } else {
        // Double check cache bust on manifest
        await fetch(`/manifest.webmanifest?_t=${Date.now()}`, { cache: 'no-store' });
        setTimeout(() => {
          if (!registration.waiting) {
            setUpdateStatus('You are running the latest version.');
            setTimeout(() => setUpdateStatus(null), 3000);
          }
        }, 1200);
      }
    } catch {
      setUpdateStatus('Could not check for updates (offline or network error).');
      setTimeout(() => setUpdateStatus(null), 3000);
    } finally {
      setIsChecking(false);
    }
  }, []);

  const forceUpdate = useCallback(async () => {
    setUpdateStatus('Updating and refreshing...');
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    try {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      }
    } catch {
      // continue reload
    }
    // Small delay then hard reload
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }, [waitingWorker]);

  return {
    isUpdateAvailable,
    isChecking,
    updateStatus,
    checkForUpdates,
    forceUpdate,
    dismissNotification: () => setUpdateStatus(null),
  };
}
