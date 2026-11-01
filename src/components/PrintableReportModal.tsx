import React, { useRef } from 'react';
import { AppState } from '../types';
import { formatSeconds } from '../utils/storage';
import { Printer, Download, X, FileText, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';

interface PrintableReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: AppState;
}

export const PrintableReportModal: React.FC<PrintableReportModalProps> = ({
  isOpen,
  onClose,
  state,
}) => {
  const reportRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const onFieldPlayers = state.players.filter((p) => p.isOnField && !p.subStagedForPlayerId);
  const benchPlayers = state.players.filter((p) => !p.isOnField && !p.subStagedForPlayerId);
  const dateStr = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadHtml = () => {
    if (!reportRef.current) return;
    const content = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Match Report - ${state.settings.teamName}</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; margin: 24px; color: #1e293b; }
    h1 { margin-bottom: 4px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; margin-bottom: 24px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; font-size: 13px; }
    th { background: #f1f5f9; font-weight: bold; }
    .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 11px; }
    .in { background: #dcfce7; color: #166534; }
    .out { background: #fef3c7; color: #92400e; }
    @media print {
      body { margin: 0; }
    }
  </style>
</head>
<body>
  ${reportRef.current.innerHTML}
</body>
</html>`;

    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `match-report-${state.settings.teamName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-white overflow-hidden">
        {/* Modal Controls Header (Hidden in Print) */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-950 border-b border-slate-800 shrink-0 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Printable Lineup & Substitution Report</h2>
              <p className="text-xs text-slate-400">Save as PDF or print official match sheet</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-xs font-bold text-white shadow-md transition"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadHtml}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Download Report File"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950 text-slate-900 print:p-0 print:m-0 print:bg-white print:text-black">
          {/* Printable Sheet */}
          <div
            ref={reportRef}
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6 text-slate-800 print:shadow-none print:p-0 print:max-w-none"
          >
            {/* Report Header */}
            <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-700 print:text-black" />
                  <h1 className="text-2xl font-black tracking-tight text-slate-950">
                    {state.settings.teamName || 'Team Lineup & Sub Report'}
                  </h1>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium">
                  <span className="uppercase font-bold tracking-wider text-blue-700 print:text-black">
                    Sport: {state.settings.sport.toUpperCase()}
                  </span>
                  <span>•</span>
                  <span>{dateStr} ({timeStr})</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs uppercase font-bold text-slate-500">Match Clock</div>
                <div className="font-mono text-xl font-black text-slate-950">
                  {formatSeconds(state.matchClock.seconds)}
                </div>
                <div className="text-xs font-semibold text-slate-600">
                  {state.matchClock.period}
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-bold text-slate-500 uppercase">On Pitch</div>
                <div className="text-xl font-black text-slate-900">{onFieldPlayers.length} Players</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Bench / Subs</div>
                <div className="text-xl font-black text-slate-900">{benchPlayers.length} Players</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Substitutions</div>
                <div className="text-xl font-black text-slate-900">{state.subLogs.length} Swaps</div>
              </div>
            </div>

            {/* Section 1: Active Lineup on Field */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Active Lineup on Pitch ({onFieldPlayers.length})
              </h3>
              <table className="w-full text-left text-xs border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold">
                    <th className="py-2 px-3 border border-slate-200 w-12 text-center">#</th>
                    <th className="py-2 px-3 border border-slate-200">Player Name</th>
                    <th className="py-2 px-3 border border-slate-200 w-20 text-center">Position</th>
                    <th className="py-2 px-3 border border-slate-200 w-28 text-right">Time Played</th>
                  </tr>
                </thead>
                <tbody>
                  {onFieldPlayers.map((player) => (
                    <tr key={player.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-1.5 px-3 border border-slate-200 font-mono font-bold text-center">
                        {player.number}
                      </td>
                      <td className="py-1.5 px-3 border border-slate-200 font-semibold text-slate-900">
                        {player.name}
                      </td>
                      <td className="py-1.5 px-3 border border-slate-200 text-center font-bold text-slate-600">
                        {player.position || '—'}
                      </td>
                      <td className="py-1.5 px-3 border border-slate-200 text-right font-mono font-bold text-emerald-700">
                        {formatSeconds(player.totalSeconds)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 2: Bench & Substitutes */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Bench & Available Roster ({benchPlayers.length})
              </h3>
              <table className="w-full text-left text-xs border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold">
                    <th className="py-2 px-3 border border-slate-200 w-12 text-center">#</th>
                    <th className="py-2 px-3 border border-slate-200">Player Name</th>
                    <th className="py-2 px-3 border border-slate-200 w-20 text-center">Position</th>
                    <th className="py-2 px-3 border border-slate-200 w-28 text-right">Time Played</th>
                  </tr>
                </thead>
                <tbody>
                  {benchPlayers.map((player) => (
                    <tr key={player.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-1.5 px-3 border border-slate-200 font-mono font-bold text-center text-slate-600">
                        {player.number}
                      </td>
                      <td className="py-1.5 px-3 border border-slate-200 font-medium text-slate-800">
                        {player.name}
                      </td>
                      <td className="py-1.5 px-3 border border-slate-200 text-center font-semibold text-slate-500">
                        {player.position || '—'}
                      </td>
                      <td className="py-1.5 px-3 border border-slate-200 text-right font-mono text-slate-600">
                        {formatSeconds(player.totalSeconds)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 3: Chronological Substitution Timeline */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Substitution Log Timeline ({state.subLogs.length} Swaps Recorded)
              </h3>
              {state.subLogs.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500 border border-dashed border-slate-300 rounded">
                  No substitutions were made during this match session.
                </div>
              ) : (
                <table className="w-full text-left text-xs border border-slate-200">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold">
                      <th className="py-2 px-2 border border-slate-200 w-8 text-center">#</th>
                      <th className="py-2 px-2.5 border border-slate-200 w-24">Match Clock</th>
                      <th className="py-2 px-3 border border-slate-200">Player IN</th>
                      <th className="py-2 px-3 border border-slate-200">Player OUT</th>
                      <th className="py-2 px-3 border border-slate-200 text-right w-24">Shift Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.subLogs.map((log, index) => (
                      <tr key={log.id} className="border-b border-slate-100">
                        <td className="py-1.5 px-2 border border-slate-200 text-center font-mono font-bold">
                          {index + 1}
                        </td>
                        <td className="py-1.5 px-2.5 border border-slate-200 font-mono font-bold text-slate-900">
                          {formatSeconds(log.matchTimeSeconds)}
                          {log.period && (
                            <span className="block text-[10px] font-normal text-slate-500">
                              {log.period}
                            </span>
                          )}
                        </td>
                        <td className="py-1.5 px-3 border border-slate-200 font-semibold text-emerald-800">
                          <span className="font-mono font-bold">#{log.playerIn.number}</span> {log.playerIn.name}
                          {log.playerIn.position && (
                            <span className="ml-1 text-[10px] text-slate-500">({log.playerIn.position})</span>
                          )}
                        </td>
                        <td className="py-1.5 px-3 border border-slate-200 font-medium text-amber-800">
                          <span className="font-mono font-bold">#{log.playerOut.number}</span> {log.playerOut.name}
                          {log.playerOut.position && (
                            <span className="ml-1 text-[10px] text-slate-500">({log.playerOut.position})</span>
                          )}
                        </td>
                        <td className="py-1.5 px-3 border border-slate-200 text-right font-mono text-slate-600">
                          {typeof log.playerOut.playedSeconds === 'number'
                            ? formatSeconds(log.playerOut.playedSeconds)
                            : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Official Signatures & Verification */}
            <div className="pt-6 border-t-2 border-slate-300 grid grid-cols-2 gap-8 text-xs text-slate-700">
              <div>
                <div className="border-b border-slate-400 pb-1 mb-1">Coach Signature</div>
                <div className="text-[10px] text-slate-400">Verified by Head Coach</div>
              </div>
              <div>
                <div className="border-b border-slate-400 pb-1 mb-1">Official / League Referee</div>
                <div className="text-[10px] text-slate-400">Match Scorer / Official Sign-off</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
