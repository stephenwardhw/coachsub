import React, { useRef, useState } from 'react';
import { AppState } from '../types';
import { exportToJsonFile } from '../utils/storage';
import {
  Download,
  Upload,
  Copy,
  Check,
  AlertCircle,
  X,
  FileJson,
  CheckCircle2,
} from 'lucide-react';

interface ExportImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentState: AppState;
  onImportState: (importedState: AppState) => void;
}

export const ExportImportModal: React.FC<ExportImportModalProps> = ({
  isOpen,
  onClose,
  currentState,
  onImportState,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    exportToJsonFile(currentState);
  };

  const handleCopyClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(currentState, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setImportStatus('Unable to copy automatically');
      setIsError(true);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        if (!parsed || !Array.isArray(parsed.players)) {
          throw new Error('Invalid format: missing players array');
        }

        onImportState(parsed as AppState);
        setImportStatus(`Successfully imported "${parsed.settings?.teamName || 'Team'}" with ${parsed.players.length} players!`);
        setIsError(false);
        setTimeout(() => {
          onClose();
        }, 1200);
      } catch (err: unknown) {
        setIsError(true);
        const errorMsg = err instanceof Error ? err.message : 'Invalid JSON file';
        setImportStatus(`Import failed: ${errorMsg}`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-white">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <FileJson className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Backup & Transfer (JSON)</h2>
            <p className="text-xs text-slate-400">
              Export your roster and timers to save backup or load on another phone
            </p>
          </div>
        </div>

        {/* Status notification */}
        {importStatus && (
          <div
            className={`mt-4 p-3 rounded-xl flex items-center gap-2.5 text-xs font-medium ${
              isError
                ? 'bg-red-950/60 border border-red-800/80 text-red-200'
                : 'bg-emerald-950/60 border border-emerald-800/80 text-emerald-200'
            }`}
          >
            {isError ? (
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            )}
            <span>{importStatus}</span>
          </div>
        )}

        {/* Export Section */}
        <div className="mt-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Export Current Team
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download .JSON</span>
            </button>

            <button
              type="button"
              onClick={handleCopyClipboard}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700 text-sm font-semibold text-slate-200 transition active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy JSON Text</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Import Section */}
        <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Import from JSON File
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-800/40 hover:bg-slate-800/80 text-sm font-semibold text-slate-300 hover:text-white transition cursor-pointer"
          >
            <Upload className="w-4 h-4 text-blue-400" />
            <span>Select JSON File to Restore</span>
          </button>
        </div>

        {/* Info */}
        <div className="mt-5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
          <strong>Local Persistence:</strong> All changes are automatically stored in this browser's local device storage. Downloading JSON lets you save historical games or transfer to another phone.
        </div>
      </div>
    </div>
  );
};
