import React from 'react';
import { Player } from '../types';
import { ArrowRight, CheckCheck, X } from 'lucide-react';

interface StagedSubPair {
  subPlayer: Player;
  targetPlayer: Player;
}

interface StagedSubBarProps {
  stagedPairs: StagedSubPair[];
  onExecute: () => void;
  onCancelSub: (subPlayerId: string) => void;
  onCancelAll: () => void;
}

export const StagedSubBar: React.FC<StagedSubBarProps> = ({
  stagedPairs,
  onExecute,
  onCancelSub,
  onCancelAll,
}) => {
  if (stagedPairs.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-t-2 border-emerald-500 shadow-2xl p-2.5 sm:p-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 z-30">
      {/* Pending Swaps List */}
      <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 w-full sm:w-auto">
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 shrink-0 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          Pending ({stagedPairs.length}):
        </span>

        <div className="flex items-center gap-1.5 flex-wrap">
          {stagedPairs.map(({ subPlayer, targetPlayer }) => (
            <div
              key={subPlayer.id}
              className="inline-flex items-center gap-1.5 bg-slate-800/90 text-white rounded-lg px-2 py-1 border border-emerald-500/50 text-xs shadow-xs"
            >
              {/* In Player */}
              <span className="font-mono font-bold text-emerald-400">
                #{subPlayer.number} {subPlayer.name}
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
              {/* Out Player */}
              <span className="font-mono font-medium text-amber-300">
                #{targetPlayer.number} {targetPlayer.name}
              </span>
              {/* Cancel individual button */}
              <button
                type="button"
                onClick={() => onCancelSub(subPlayer.id)}
                title="Cancel this substitution"
                className="ml-1 text-slate-400 hover:text-red-400 p-0.5 rounded-full hover:bg-slate-700"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
        <button
          type="button"
          onClick={onCancelAll}
          className="px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700 active:scale-95 transition"
        >
          Cancel All
        </button>

        <button
          type="button"
          onClick={onExecute}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/30 transition-all transform active:scale-95 animate-pulse"
        >
          <CheckCheck className="w-4 h-4 stroke-[2.5]" />
          <span>Execute Substitutions ({stagedPairs.length})</span>
        </button>
      </div>
    </div>
  );
};
