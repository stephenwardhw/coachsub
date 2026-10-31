import React from 'react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-white">
        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon & Heading */}
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/30 shrink-0">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Reset All Player Timers?</h3>
            <p className="mt-1 text-sm text-slate-300 leading-relaxed">
              Are you sure you want to reset the playing time for <strong className="text-red-400 font-semibold">all players</strong> to 00:00?
            </p>
          </div>
        </div>

        {/* Warning Notice Box */}
        <div className="mt-4 p-3 rounded-xl bg-red-950/40 border border-red-900/50 text-xs text-red-200">
          ⚠️ <strong>Warning:</strong> This action cannot be undone. All recorded playing minutes and game rotation statistics will be wiped back to zero.
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-sm font-semibold text-slate-300 hover:bg-slate-700 active:scale-95 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-sm font-bold text-white shadow-lg shadow-red-600/30 active:scale-95 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Yes, Reset All Timers</span>
          </button>
        </div>
      </div>
    </div>
  );
};
