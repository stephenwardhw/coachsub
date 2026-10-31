import React, { useState } from 'react';
import { SubstitutionLog } from '../types';
import { formatSeconds } from '../utils/storage';
import {
  Clock,
  ArrowRightLeft,
  ArrowRight,
  X,
  Share2,
  Trash2,
  Check,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

interface SubTimelinePanelProps {
  isOpen: boolean;
  onClose: () => void;
  logs: SubstitutionLog[];
  onClearLogs: () => void;
}

export const SubTimelinePanel: React.FC<SubTimelinePanelProps> = ({
  isOpen,
  onClose,
  logs,
  onClearLogs,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyReport = async () => {
    if (logs.length === 0) return;
    const lines = logs.map((log, index) => {
      const matchTime = formatSeconds(log.matchTimeSeconds);
      const periodStr = log.period ? ` (${log.period})` : '';
      return `${index + 1}. [${matchTime}${periodStr}] #${log.playerIn.number} ${log.playerIn.name} IN ➔ #${log.playerOut.number} ${log.playerOut.name} OUT`;
    });

    const reportText = `📋 Match Substitution Timeline (${logs.length} swaps):\n` + lines.join('\n');
    try {
      await navigator.clipboard.writeText(reportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-lg max-h-[85vh] sm:max-h-[80vh] flex flex-col rounded-t-2xl sm:rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Substitution Timeline</span>
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                  {logs.length}
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">Chronological history of match rotations</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {logs.length > 0 && (
              <button
                type="button"
                onClick={handleCopyReport}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs flex items-center gap-1"
                title="Copy timeline report to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Timeline Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 touch-pan-y">
          {logs.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
              <Clock className="w-10 h-10 opacity-30 text-emerald-400" />
              <p className="text-sm font-semibold text-slate-400">No substitutions made yet</p>
              <p className="text-xs text-slate-500 max-w-xs">
                Drag a bench player over an on-field player to stage a sub, then click "Execute Substitutions" to record it here.
              </p>
            </div>
          ) : (
            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {logs.map((log, index) => {
                const matchTime = formatSeconds(log.matchTimeSeconds);

                return (
                  <div key={log.id} className="relative group">
                    {/* Timeline Node Icon */}
                    <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>

                    {/* Timeline Event Card */}
                    <div className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-3 shadow-xs space-y-2 hover:border-emerald-500/50 transition">
                      {/* Top Time Badges */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 font-mono font-bold text-[11px] border border-emerald-500/40">
                            ⏱️ {matchTime}
                          </span>
                          {log.period && (
                            <span className="text-[10px] text-slate-400 font-medium">
                              • {log.period}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {log.timestamp}
                        </span>
                      </div>

                      {/* Swapped Players Presentation */}
                      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-700/50">
                        {/* IN Player */}
                        <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 rounded-lg p-2">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-[11px] text-white shrink-0 shadow-xs ring-1 ring-emerald-400"
                            style={{ backgroundColor: log.playerIn.color || '#059669' }}
                          >
                            {log.playerIn.number}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="text-[9px] font-black uppercase text-emerald-400">
                                IN
                              </span>
                              {log.playerIn.position && (
                                <span className="text-[8px] px-1 rounded bg-black/60 text-slate-300">
                                  {log.playerIn.position}
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-bold text-white truncate">
                              {log.playerIn.name}
                            </div>
                          </div>
                        </div>

                        {/* OUT Player */}
                        <div className="flex items-center gap-2 bg-amber-950/30 border border-amber-500/30 rounded-lg p-2">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-[11px] text-white shrink-0 shadow-xs ring-1 ring-amber-400"
                            style={{ backgroundColor: log.playerOut.color || '#3b82f6' }}
                          >
                            {log.playerOut.number}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="text-[9px] font-black uppercase text-amber-400">
                                OUT
                              </span>
                              {log.playerOut.position && (
                                <span className="text-[8px] px-1 rounded bg-black/60 text-slate-300">
                                  {log.playerOut.position}
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-semibold text-slate-200 truncate">
                              {log.playerOut.name}
                            </div>
                            {typeof log.playerOut.playedSeconds === 'number' && (
                              <div className="text-[9px] text-slate-400 font-mono">
                                Shift: {formatSeconds(log.playerOut.playedSeconds)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-t border-slate-800 shrink-0">
          {logs.length > 0 ? (
            <button
              type="button"
              onClick={() => {
                if (confirm('Clear substitution timeline history?')) {
                  onClearLogs();
                }
              }}
              className="flex items-center gap-1 text-[11px] text-red-400 hover:text-red-300 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
