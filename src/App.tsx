import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  AppState,
  FieldPosition,
  GoalSide,
  Player,
  SportType,
  SubstitutionLog,
} from './types';
import {
  loadAppState,
  saveAppState,
  formatSeconds,
  getPresetRosterForSport,
} from './utils/storage';
import { sounds } from './utils/audio';
import { FieldCanvas } from './components/FieldCanvas';
import { PlayerToken } from './components/PlayerToken';
import { BenchTray } from './components/BenchTray';
import { MatchClock } from './components/MatchClock';
import { StagedSubBar } from './components/StagedSubBar';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { RosterModal } from './components/RosterModal';
import { ExportImportModal } from './components/ExportImportModal';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import {
  Users,
  Timer,
  AlertCircle,
  HelpCircle,
  ArrowRightLeft,
  X,
  Sparkles,
} from 'lucide-react';

interface ActiveDrag {
  player: Player;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  source: 'bench' | 'field';
}

export default function App() {
  const [state, setState] = useState<AppState>(() => loadAppState());
  const [activeDrag, setActiveDrag] = useState<ActiveDrag | null>(null);
  const [hoveredPlayerId, setHoveredPlayerId] = useState<string | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isRosterModalOpen, setIsRosterModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedFieldPlayer, setSelectedFieldPlayer] = useState<Player | null>(null);

  const fieldRef = useRef<HTMLDivElement>(null);

  // Auto-save state to localStorage whenever it changes
  useEffect(() => {
    saveAppState(state);
  }, [state]);

  // Toast auto-clear
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Clock & Player Timers Ticker
  useEffect(() => {
    if (!state.matchClock.isRunning) return;

    const interval = setInterval(() => {
      setState((prev) => {
        const nextClockSeconds = prev.matchClock.seconds + 1;

        // Increment time for players currently active on the field
        const updatedPlayers = prev.players.map((p) => {
          if (p.isOnField && !p.subStagedForPlayerId) {
            return {
              ...p,
              totalSeconds: p.totalSeconds + 1,
            };
          }
          return p;
        });

        return {
          ...prev,
          matchClock: {
            ...prev.matchClock,
            seconds: nextClockSeconds,
          },
          players: updatedPlayers,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.matchClock.isRunning]);

  // Sport change
  const handleChangeSport = (newSport: SportType) => {
    setState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        sport: newSport,
      },
    }));
    setToastMessage(`Switched field to ${newSport.toUpperCase()}`);
  };

  // Flip field horizontally
  const handleFlipField = () => {
    setState((prev) => {
      const nextSide: GoalSide = prev.settings.goalSide === 'left' ? 'right' : 'left';
      // Mirror horizontal coordinates for all on-field and staged players: x' = 100 - x
      const flippedPlayers = prev.players.map((p) => {
        if (p.fieldPosition) {
          return {
            ...p,
            fieldPosition: {
              x: Math.round((100 - p.fieldPosition.x) * 10) / 10,
              y: p.fieldPosition.y,
            },
          };
        }
        return p;
      });

      return {
        ...prev,
        settings: {
          ...prev.settings,
          goalSide: nextSide,
        },
        players: flippedPlayers,
      };
    });
    setToastMessage(`Flipped field: Goal is now on the ${state.settings.goalSide === 'left' ? 'RIGHT' : 'LEFT'}`);
  };

  // Toggle match clock
  const handleTogglePlayPause = () => {
    setState((prev) => ({
      ...prev,
      matchClock: {
        ...prev.matchClock,
        isRunning: !prev.matchClock.isRunning,
      },
    }));
  };

  // Reset clock only
  const handleResetClock = () => {
    setState((prev) => ({
      ...prev,
      matchClock: {
        ...prev.matchClock,
        seconds: 0,
      },
    }));
    setToastMessage('Match clock reset to 00:00');
  };

  // Change match period
  const handleChangePeriod = (period: string) => {
    setState((prev) => ({
      ...prev,
      matchClock: {
        ...prev.matchClock,
        period,
      },
    }));
  };

  // Reset ALL Player Timers (warning confirmed)
  const handleConfirmResetAllTimers = () => {
    setState((prev) => ({
      ...prev,
      players: prev.players.map((p) => ({
        ...p,
        totalSeconds: 0,
      })),
      matchClock: {
        ...prev.matchClock,
        seconds: 0,
      },
    }));
    setToastMessage('All player timers reset to 00:00');
  };

  // Staged substitutions list
  const stagedSubPlayers = state.players.filter((p) => p.subStagedForPlayerId);
  const stagedPairs = stagedSubPlayers
    .map((subPlayer) => {
      const targetPlayer = state.players.find((p) => p.id === subPlayer.subStagedForPlayerId);
      return targetPlayer ? { subPlayer, targetPlayer } : null;
    })
    .filter((pair): pair is { subPlayer: Player; targetPlayer: Player } => pair !== null);

  const stagedPlayerIds = new Set(stagedSubPlayers.map((p) => p.id));
  const replacedPlayerIds = new Set(stagedPairs.map((pair) => pair.targetPlayer.id));

  // Execute staged substitutions
  const handleExecuteSubstitutions = () => {
    if (stagedPairs.length === 0) return;

    sounds.playWhistle();

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLogs: SubstitutionLog[] = [];

    setState((prev) => {
      const nextPlayers = [...prev.players];

      stagedPairs.forEach(({ subPlayer, targetPlayer }) => {
        const subIndex = nextPlayers.findIndex((p) => p.id === subPlayer.id);
        const targetIndex = nextPlayers.findIndex((p) => p.id === targetPlayer.id);

        if (subIndex !== -1 && targetIndex !== -1) {
          const originalTargetPos = nextPlayers[targetIndex].fieldPosition;

          // 1. Move incoming player to the target's exact field position
          nextPlayers[subIndex] = {
            ...nextPlayers[subIndex],
            isOnField: true,
            fieldPosition: originalTargetPos,
            subStagedForPlayerId: null,
          };

          // 2. Move replaced player back to the bench
          nextPlayers[targetIndex] = {
            ...nextPlayers[targetIndex],
            isOnField: false,
            fieldPosition: null,
          };

          newLogs.push({
            id: 'sub_' + Date.now() + Math.random(),
            timestamp,
            matchTimeSeconds: prev.matchClock.seconds,
            playerIn: { id: subPlayer.id, name: subPlayer.name, number: subPlayer.number },
            playerOut: { id: targetPlayer.id, name: targetPlayer.name, number: targetPlayer.number },
          });
        }
      });

      return {
        ...prev,
        players: nextPlayers,
        subLogs: [...newLogs, ...prev.subLogs],
      };
    });

    const summary = stagedPairs.map((p) => `#${p.subPlayer.number} IN for #${p.targetPlayer.number}`).join(', ');
    setToastMessage(`⚡ Substitution Executed: ${summary}`);
  };

  // Cancel individual staged sub
  const handleCancelSub = (subPlayerId: string) => {
    setState((prev) => ({
      ...prev,
      players: prev.players.map((p) =>
        p.id === subPlayerId
          ? { ...p, subStagedForPlayerId: null, fieldPosition: null, isOnField: false }
          : p
      ),
    }));
  };

  // Cancel all staged subs
  const handleCancelAllSubs = () => {
    setState((prev) => ({
      ...prev,
      players: prev.players.map((p) =>
        p.subStagedForPlayerId
          ? { ...p, subStagedForPlayerId: null, fieldPosition: null, isOnField: false }
          : p
      ),
    }));
    setToastMessage('All staged substitutions cancelled');
  };

  // Unified Pointer Drag Engine (works with touch, pen, mouse)
  const handleStartDrag = (e: React.PointerEvent, player: Player) => {
    // Only primary pointer
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    e.preventDefault();
    e.stopPropagation();

    const clientX = e.clientX;
    const clientY = e.clientY;

    setActiveDrag({
      player,
      startX: clientX,
      startY: clientY,
      currentX: clientX,
      currentY: clientY,
      source: player.isOnField ? 'field' : 'bench',
    });
  };

  // Global pointer move listener during drag
  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!activeDrag) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      setActiveDrag((prev) =>
        prev ? { ...prev, currentX: clientX, currentY: clientY } : null
      );

      // Check if pointer is hovering over any on-field player to stage a sub
      if (fieldRef.current) {
        const rect = fieldRef.current.getBoundingClientRect();
        const isInsideField =
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom;

        if (isInsideField) {
          const px = ((clientX - rect.left) / rect.width) * 100;
          const py = ((clientY - rect.top) / rect.height) * 100;

          // Find active on-field players (excluding the currently dragged player and staged players)
          let nearestPlayerId: string | null = null;
          let minDistance = 999;

          state.players.forEach((p) => {
            if (
              p.isOnField &&
              p.fieldPosition &&
              p.id !== activeDrag.player.id &&
              !p.subStagedForPlayerId
            ) {
              const dx = p.fieldPosition.x - px;
              const dy = p.fieldPosition.y - py;
              // Aspect ratio weighting (field is ~10:6)
              const dist = Math.sqrt(dx * dx + (dy * 1.6) * (dy * 1.6));
              if (dist < 10 && dist < minDistance) {
                minDistance = dist;
                nearestPlayerId = p.id;
              }
            }
          });

          setHoveredPlayerId(nearestPlayerId);
        } else {
          setHoveredPlayerId(null);
        }
      }
    },
    [activeDrag, state.players]
  );

  // Global pointer up listener to commit drag
  const handlePointerUp = useCallback(
    (e: PointerEvent) => {
      if (!activeDrag) return;

      const clientX = e.clientX;
      const clientY = e.clientY;
      const draggedPlayer = activeDrag.player;

      if (fieldRef.current) {
        const rect = fieldRef.current.getBoundingClientRect();
        const isInsideField =
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom;

        if (isInsideField) {
          // Calculate percentage coordinates on the field
          const rawPx = ((clientX - rect.left) / rect.width) * 100;
          const rawPy = ((clientY - rect.top) / rect.height) * 100;
          const clampedX = Math.round(Math.max(5, Math.min(95, rawPx)) * 10) / 10;
          const clampedY = Math.round(Math.max(6, Math.min(94, rawPy)) * 10) / 10;

          // SCENARIO 1: Dropped over an active on-field player -> STAGE SUBSTITUTION
          if (hoveredPlayerId && hoveredPlayerId !== draggedPlayer.id) {
            const targetPlayer = state.players.find((p) => p.id === hoveredPlayerId);
            if (targetPlayer && targetPlayer.fieldPosition) {
              // Offset slightly up and to the right as explicitly requested:
              // "The icon should then be placed over the existing player and a bit up and to the right so it does not overlap."
              const stagedX = Math.round(Math.min(94, targetPlayer.fieldPosition.x + 7) * 10) / 10;
              const stagedY = Math.round(Math.max(6, targetPlayer.fieldPosition.y - 8) * 10) / 10;

              setState((prev) => ({
                ...prev,
                players: prev.players.map((p) => {
                  if (p.id === draggedPlayer.id) {
                    return {
                      ...p,
                      isOnField: true,
                      subStagedForPlayerId: targetPlayer.id,
                      fieldPosition: { x: stagedX, y: stagedY },
                    };
                  }
                  return p;
                }),
              }));

              sounds.playDrop();
              setToastMessage(
                `Sub staged: #${draggedPlayer.number} ${draggedPlayer.name} ready to replace #${targetPlayer.number} ${targetPlayer.name}`
              );
            }
          } else {
            // SCENARIO 2: Dropped on open field -> Place/reposition player directly
            setState((prev) => ({
              ...prev,
              players: prev.players.map((p) => {
                if (p.id === draggedPlayer.id) {
                  return {
                    ...p,
                    isOnField: true,
                    subStagedForPlayerId: null, // clear staged state if placed freely
                    fieldPosition: { x: clampedX, y: clampedY },
                  };
                }
                return p;
              }),
            }));

            sounds.playDrop();
          }
        } else {
          // SCENARIO 3: Dropped outside the field (e.g. onto bottom half / bench)
          // If was on field or staged, move back to bench and stop timer!
          setState((prev) => ({
            ...prev,
            players: prev.players.map((p) => {
              if (p.id === draggedPlayer.id) {
                return {
                  ...p,
                  isOnField: false,
                  subStagedForPlayerId: null,
                  fieldPosition: null,
                };
              }
              return p;
            }),
          }));

          sounds.playDrop();
          setToastMessage(`#${draggedPlayer.number} ${draggedPlayer.name} moved to bench`);
        }
      }

      setActiveDrag(null);
      setHoveredPlayerId(null);
    },
    [activeDrag, hoveredPlayerId, state.players]
  );

  useEffect(() => {
    if (activeDrag) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointercancel', handlePointerUp);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        window.removeEventListener('pointercancel', handlePointerUp);
      };
    }
  }, [activeDrag, handlePointerMove, handlePointerUp]);

  // Click on-field player for quick sub selection or benching
  const handleOnFieldPlayerClick = (player: Player) => {
    setSelectedFieldPlayer(player);
  };

  const onFieldPlayers = state.players.filter((p) => p.isOnField && !p.subStagedForPlayerId);
  const benchPlayers = state.players.filter((p) => !p.isOnField && !p.subStagedForPlayerId);

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-white select-none overflow-hidden font-sans">
      {/* Top Header & Match Clock Controls */}
      <MatchClock
        sport={state.settings.sport}
        onChangeSport={handleChangeSport}
        goalSide={state.settings.goalSide}
        onFlipField={handleFlipField}
        clockSeconds={state.matchClock.seconds}
        isClockRunning={state.matchClock.isRunning}
        period={state.matchClock.period}
        onChangePeriod={handleChangePeriod}
        onTogglePlayPause={handleTogglePlayPause}
        onResetClock={handleResetClock}
        onRequestResetTimers={() => setIsResetModalOpen(true)}
        onOpenExportImport={() => setIsExportModalOpen(true)}
      />

      {/* Main Workspace: Split exactly between Top Half (Field) and Bottom Half (Bench) */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* TOP HALF: Sports Field Canvas (50% of available height) */}
        <div
          ref={fieldRef}
          className="relative h-1/2 w-full bg-slate-900 border-b-2 border-slate-800 overflow-hidden touch-none"
        >
          <FieldCanvas sport={state.settings.sport} goalSide={state.settings.goalSide}>
            {/* On-field active players */}
            {onFieldPlayers.map((player) => {
              if (!player.fieldPosition) return null;
              const isBeingReplaced = replacedPlayerIds.has(player.id);
              const isTargeted = hoveredPlayerId === player.id;
              const stagedSub = stagedPairs.find((pair) => pair.targetPlayer.id === player.id)?.subPlayer;

              return (
                <div
                  key={player.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-75"
                  style={{
                    left: `${player.fieldPosition.x}%`,
                    top: `${player.fieldPosition.y}%`,
                  }}
                >
                  <PlayerToken
                    player={player}
                    isBeingReplaced={isBeingReplaced}
                    stagedSubPlayer={stagedSub}
                    isTargeted={isTargeted}
                    size="md"
                    showTimer={true}
                    showName={true}
                    onPointerDown={(e) => handleStartDrag(e, player)}
                    onClick={() => handleOnFieldPlayerClick(player)}
                  />
                </div>
              );
            })}

            {/* Staged Substitution Players: Offset slightly up and to the right */}
            {stagedSubPlayers.map((player) => {
              if (!player.fieldPosition) return null;
              const targetPlayer = state.players.find((p) => p.id === player.subStagedForPlayerId);

              return (
                <div
                  key={player.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 transition-transform duration-75"
                  style={{
                    left: `${player.fieldPosition.x}%`,
                    top: `${player.fieldPosition.y}%`,
                  }}
                >
                  {/* Visual dashed connector line between target and incoming sub */}
                  {targetPlayer && targetPlayer.fieldPosition && (
                    <svg className="absolute -inset-10 w-28 h-28 pointer-events-none -z-10">
                      <line
                        x1="20"
                        y1="60"
                        x2="60"
                        y2="20"
                        stroke="#34d399"
                        strokeWidth="2.5"
                        strokeDasharray="4 3"
                      />
                    </svg>
                  )}

                  <PlayerToken
                    player={player}
                    isStagedSub={true}
                    size="sm"
                    showTimer={true}
                    showName={true}
                    onPointerDown={(e) => handleStartDrag(e, player)}
                    onClick={() => handleCancelSub(player.id)}
                  />
                </div>
              );
            })}

            {/* Field Status & Helper Overlay */}
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 pointer-events-none">
              <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white border border-white/20">
                On Field: {onFieldPlayers.length}
              </span>
              {stagedPairs.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-600/90 text-[10px] font-bold text-white shadow animate-pulse">
                  {stagedPairs.length} Sub{stagedPairs.length > 1 ? 's' : ''} Staged
                </span>
              )}
            </div>

            {/* PWA Install Button Top Right of field */}
            <div className="absolute top-2 right-2 pointer-events-auto z-10">
              <PWAInstallButton />
            </div>
          </FieldCanvas>
        </div>

        {/* Staged Substitutions Bar (visible when coach staged any swaps) */}
        <StagedSubBar
          stagedPairs={stagedPairs}
          onExecute={handleExecuteSubstitutions}
          onCancelSub={handleCancelSub}
          onCancelAll={handleCancelAllSubs}
        />

        {/* BOTTOM HALF: Bench Tray of Available Players (50% of available height) */}
        <div className="h-1/2 w-full min-h-0">
          <BenchTray
            benchPlayers={benchPlayers}
            stagedPlayerIds={stagedPlayerIds}
            onStartDrag={handleStartDrag}
            onOpenRosterModal={() => setIsRosterModalOpen(true)}
            onQuickAddPlayer={() => setIsRosterModalOpen(true)}
            onBenchPlayerClick={(player) => {
              // Quick tap helper: if a field player is selected, stage sub!
              if (selectedFieldPlayer) {
                const targetPos = selectedFieldPlayer.fieldPosition;
                if (targetPos) {
                  const stagedX = Math.round(Math.min(94, targetPos.x + 7) * 10) / 10;
                  const stagedY = Math.round(Math.max(6, targetPos.y - 8) * 10) / 10;
                  setState((prev) => ({
                    ...prev,
                    players: prev.players.map((p) =>
                      p.id === player.id
                        ? {
                            ...p,
                            isOnField: true,
                            subStagedForPlayerId: selectedFieldPlayer.id,
                            fieldPosition: { x: stagedX, y: stagedY },
                          }
                        : p
                    ),
                  }));
                  setSelectedFieldPlayer(null);
                  sounds.playDrop();
                  setToastMessage(`Staged #${player.number} to replace #${selectedFieldPlayer.number}`);
                }
              }
            }}
          />
        </div>
      </div>

      {/* Floating Drag Avatar (rendered during pointer drag) */}
      {activeDrag && (
        <div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-none scale-110 drop-shadow-2xl"
          style={{
            left: `${activeDrag.currentX}px`,
            top: `${activeDrag.currentY}px`,
          }}
        >
          <div className="animate-pulse">
            <PlayerToken
              player={activeDrag.player}
              size="lg"
              showTimer={true}
              showName={true}
              interactive={false}
            />
          </div>
          {hoveredPlayerId && (
            <div className="mt-1 px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-black text-[10px] text-center shadow-lg uppercase tracking-wider">
              Stage Sub
            </div>
          )}
        </div>
      )}

      {/* Quick Player Modal for Tap Selection (Mobile friendly alternative to drag) */}
      {selectedFieldPlayer && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-xs w-full text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white"
                  style={{ backgroundColor: selectedFieldPlayer.color || '#3b82f6' }}
                >
                  #{selectedFieldPlayer.number}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{selectedFieldPlayer.name}</h4>
                  <div className="text-xs text-emerald-400 font-mono">
                    Time: {formatSeconds(selectedFieldPlayer.totalSeconds)}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedFieldPlayer(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  // Move directly to bench
                  setState((prev) => ({
                    ...prev,
                    players: prev.players.map((p) =>
                      p.id === selectedFieldPlayer.id
                        ? { ...p, isOnField: false, fieldPosition: null }
                        : p
                    ),
                  }));
                  setSelectedFieldPlayer(null);
                  sounds.playDrop();
                  setToastMessage(`#${selectedFieldPlayer.number} moved to bench`);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition"
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span>Move to Bench</span>
              </button>

              <button
                onClick={() => {
                  setSelectedFieldPlayer(null);
                  setToastMessage('Tap a player on the bench to stage substitution');
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center justify-center gap-2 transition"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>Choose Sub from Bench...</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Timers Warning Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmResetAllTimers}
      />

      {/* Roster Management Modal */}
      <RosterModal
        isOpen={isRosterModalOpen}
        onClose={() => setIsRosterModalOpen(false)}
        players={state.players}
        onUpdatePlayers={(players) => setState((prev) => ({ ...prev, players }))}
        sport={state.settings.sport}
      />

      {/* Backup & Transfer (JSON) Modal */}
      <ExportImportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        currentState={state}
        onImportState={(newState) => setState(newState)}
      />

      {/* Offline Status Indicator */}
      <OfflineIndicator />

      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900/95 border border-slate-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 backdrop-blur-md animate-fade-in">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
