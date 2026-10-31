import React from 'react';
import { GoalSide, SportType } from '../types';
import { formatSeconds } from '../utils/storage';
import {
  Play,
  Pause,
  RotateCcw,
  FlipHorizontal,
  Flame,
  Download,
  Share2,
} from 'lucide-react';

interface MatchClockProps {
  sport: SportType;
  onChangeSport: (sport: SportType) => void;
  goalSide: GoalSide;
  onFlipField: () => void;
  clockSeconds: number;
  isClockRunning: boolean;
  period: string;
  onChangePeriod: (period: string) => void;
  onTogglePlayPause: () => void;
  onResetClock: () => void;
  onRequestResetTimers: () => void;
  onOpenExportImport: () => void;
}

const PERIOD_OPTIONS: Record<SportType, string[]> = {
  soccer: ['1st Half', '2nd Half', 'Extra Time 1', 'Extra Time 2', 'Penalties'],
  hockey: ['1st Period', '2nd Period', '3rd Period', 'Overtime', 'Shootout'],
  lacrosse: ['1st Quarter', '2nd Quarter', '3rd Quarter', '4th Quarter', 'Overtime'],
  field_hockey: ['1st Quarter', '2nd Quarter', '3rd Quarter', '4th Quarter', 'Shootout'],
};

export const MatchClock: React.FC<MatchClockProps> = ({
  sport,
  onChangeSport,
  goalSide,
  onFlipField,
  clockSeconds,
  isClockRunning,
  period,
  onChangePeriod,
  onTogglePlayPause,
  onResetClock,
  onRequestResetTimers,
  onOpenExportImport,
}) => {
  const sportNames: Record<SportType, string> = {
    soccer: '⚽ Soccer',
    hockey: '🏒 Ice Hockey',
    lacrosse: '🥍 Lacrosse',
    field_hockey: '🏑 Field Hockey',
  };

  const periods = PERIOD_OPTIONS[sport] || PERIOD_OPTIONS.soccer;

  return (
    <header className="bg-slate-950/95 backdrop-blur-md text-white border-b border-slate-800 px-2.5 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 shrink-0 select-none z-20">
      {/* Left: Sport selector & Flip field button */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Sport selector dropdown */}
        <select
          value={sport}
          onChange={(e) => onChangeSport(e.target.value as SportType)}
          className="bg-slate-800/90 text-slate-100 text-xs sm:text-sm font-bold rounded-lg border border-slate-700 px-2 sm:px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-xs"
          title="Select Field Sport"
        >
          {Object.entries(sportNames).map(([key, label]) => (
            <option key={key} value={key} className="bg-slate-900 text-white font-medium">
              {label}
            </option>
          ))}
        </select>

        {/* Flip Field Direction Button */}
        <button
          type="button"
          onClick={onFlipField}
          className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-xs font-semibold text-slate-200 border border-slate-700 transition active:scale-95 shadow-xs"
          title={`Flip field direction (currently Goal on ${goalSide.toUpperCase()})`}
        >
          <FlipHorizontal className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden xs:inline">Flip Field</span>
          <span className="text-[10px] text-blue-400 font-mono uppercase font-bold">
            ({goalSide === 'left' ? 'L' : 'R'})
          </span>
        </button>
      </div>

      {/* Center: Match Clock & Period Controls */}
      <div className="flex items-center gap-2 bg-slate-900/90 rounded-xl px-2.5 py-1 border border-slate-800 shadow-inner">
        {/* Period Selector */}
        <select
          value={period}
          onChange={(e) => onChangePeriod(e.target.value)}
          className="bg-transparent text-slate-300 text-xs font-semibold focus:outline-none cursor-pointer"
          title="Match Period"
        >
          {periods.map((p) => (
            <option key={p} value={p} className="bg-slate-900 text-white">
              {p}
            </option>
          ))}
        </select>

        <span className="text-slate-600 text-xs">|</span>

        {/* Digital Clock Display */}
        <div className="font-mono text-base sm:text-lg font-black tracking-wider text-emerald-400 min-w-[54px] text-center">
          {formatSeconds(clockSeconds)}
        </div>

        {/* Play / Pause Toggle */}
        <button
          type="button"
          onClick={onTogglePlayPause}
          className={`p-1.5 rounded-lg font-bold transition active:scale-90 ${
            isClockRunning
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30'
          } shadow-md`}
          title={isClockRunning ? 'Pause Match Clock' : 'Start Match Clock'}
        >
          {isClockRunning ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>

        {/* Reset Clock */}
        <button
          type="button"
          onClick={onResetClock}
          className="p-1 text-slate-400 hover:text-slate-200 active:scale-90 transition"
          title="Reset Match Clock to 00:00"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right: Reset All Timers Warning & Data Export */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Reset All Player Timers Button with Warning */}
        <button
          type="button"
          onClick={onRequestResetTimers}
          className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 active:bg-red-800 border border-red-800/80 text-xs font-semibold text-red-200 transition active:scale-95 shadow-xs"
          title="Reset play time timers for all players"
        >
          <Flame className="w-3.5 h-3.5 text-red-400" />
          <span className="hidden sm:inline">Reset Timers</span>
          <span className="sm:hidden">Reset</span>
        </button>

        {/* Export / Backup JSON */}
        <button
          type="button"
          onClick={onOpenExportImport}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700 text-slate-300 hover:text-white transition active:scale-95 shadow-xs"
          title="Export / Backup JSON"
        >
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
