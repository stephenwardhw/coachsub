import React from 'react';
import { Language, Player } from '../types';
import { ArrowRight, CheckCheck, X } from 'lucide-react';
import { t } from '../utils/i18n';

interface StagedSubPair {
  subPlayer: Player;
  targetPlayer: Player;
}

interface StagedSubBarProps {
  stagedPairs: StagedSubPair[];
  onExecute: () => void;
  onCancelSub: (subPlayerId: string) => void;
  onCancelAll: () => void;
  language?: Language;
}

export const StagedSubBar: React.FC<StagedSubBarProps> = ({
  stagedPairs,
  onExecute,
  onCancelSub,
  onCancelAll,
  language = 'en',
}) => {
  if (stagedPairs.length === 0) return null;

  return (
    <div className="bg-slate-950/95 border-t border-b border-emerald-500/80 shadow-lg px-2 py-1 flex items-center justify-between gap-1.5 z-30 shrink-0 h-10 select-none">
      {/* Scrollable list of pending swaps */}
      <div className="flex items-center gap-1.5 overflow-x-auto min-w-0 flex-1 py-0.5 no-scrollbar">
        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 shrink-0 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span className="hidden xs:inline">Pending:</span>
        </span>

        {stagedPairs.map(({ subPlayer, targetPlayer }) => (
          <div
            key={subPlayer.id}
            className="inline-flex items-center gap-1 bg-slate-800/90 text-white rounded-md px-1.5 py-0.5 border border-emerald-500/40 text-[11px] shadow-xs shrink-0"
          >
            <span className="font-mono font-bold text-emerald-400">
              #{subPlayer.number}
            </span>
            <ArrowRight className="w-2.5 h-2.5 text-slate-400 shrink-0" />
            <span className="font-mono font-medium text-amber-300">
              #{targetPlayer.number}
            </span>
            <button
              type="button"
              onClick={() => onCancelSub(subPlayer.id)}
              title="Cancel"
              className="text-slate-400 hover:text-red-400 p-0.5 rounded hover:bg-slate-700 ml-0.5"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Action Buttons: Ultra-compact */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onClick={onCancelAll}
          className="px-1.5 py-1 rounded bg-slate-800 text-[10px] text-slate-400 hover:text-white transition cursor-pointer"
          title={t('cancel_all', language)}
        >
          {t('cancel', language)}
        </button>

        <button
          type="button"
          onClick={onExecute}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/30 transition active:scale-95 animate-pulse cursor-pointer"
        >
          <CheckCheck className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{t('execute_subs', language)} ({stagedPairs.length})</span>
        </button>
      </div>
    </div>
  );
};
