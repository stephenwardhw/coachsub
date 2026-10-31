import React, { useState, useRef, useEffect } from 'react';
import { GoalSide, SportType } from '../types';
import { formatSeconds } from '../utils/storage';
import {
  Play,
  Pause,
  RotateCcw,
  FlipHorizontal,
  Flame,
  Download,
  History,
  Menu,
  X,
  FileJson,
  Timer,
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
  onOpenTimeline: () => void;
  subCount: number;
}

const PERIOD_OPTIONS: Record<SportType, string[]> = {
  soccer: ['1st Half', '2nd Half', 'Extra Time', 'Penalties'],
  hockey: ['1st Per', '2nd Per', '3rd Per', 'OT', 'Shootout'],
  lacrosse: ['1st Qtr', '2nd Qtr', '3rd Qtr', '4th Qtr', 'OT'],
  field_hockey: ['1st Qtr', '2nd Qtr', '3rd Qtr', '4th Qtr', 'Shootout'],
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
  onOpenTimeline,
  subCount,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const periods = PERIOD_OPTIONS[sport] || PERIOD_OPTIONS.soccer;

  // Close menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="relative bg-slate-950/95 backdrop-blur-md text-white border-b border-slate-800/90 px-2 sm:px-3 py-1.5 flex items-center justify-between gap-1.5 sm:gap-2 shrink-0 select-none z-30 h-11 sm:h-12">
      {/* Left: Sport selector & Flip field button */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        <select
          value={sport}
          onChange={(e) => onChangeSport(e.target.value as SportType)}
          className="bg-slate-800/90 text-slate-100 text-xs font-bold rounded-lg border border-slate-700/80 px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-xs max-w-[80px] sm:max-w-none"
          title="Select Field Sport"
        >
          <option value="soccer" className="bg-slate-900">⚽ Soccer</option>
          <option value="hockey" className="bg-slate-900">🏒 Hockey</option>
          <option value="lacrosse" className="bg-slate-900">🥍 Lacrosse</option>
          <option value="field_hockey" className="bg-slate-900">🏑 F.Hockey</option>
        </select>

        {/* Flip Field Direction Button */}
        <button
          type="button"
          onClick={onFlipField}
          className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-xs font-semibold text-slate-200 border border-slate-700/80 transition active:scale-95 shadow-xs"
          title={`Flip field direction (currently Goal on ${goalSide.toUpperCase()})`}
        >
          <FlipHorizontal className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] text-blue-400 font-mono font-black uppercase">
            {goalSide === 'left' ? 'L' : 'R'}
          </span>
        </button>
      </div>

      {/* Center: Streamlined Digital Clock & Controls */}
      <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-900/90 rounded-lg px-1.5 sm:px-2 py-0.5 border border-slate-800 shadow-inner">
        {/* Period Selector */}
        <select
          value={period}
          onChange={(e) => onChangePeriod(e.target.value)}
          className="bg-transparent text-slate-300 text-[11px] sm:text-xs font-semibold focus:outline-none cursor-pointer max-w-[65px] sm:max-w-none"
          title="Match Period"
        >
          {periods.map((p) => (
            <option key={p} value={p} className="bg-slate-900 text-white">
              {p}
            </option>
          ))}
        </select>

        <span className="text-slate-700 text-xs">|</span>

        {/* Digital Clock Display */}
        <div className="font-mono text-sm sm:text-base font-black tracking-wider text-emerald-400 min-w-[46px] text-center leading-none">
          {formatSeconds(clockSeconds)}
        </div>

        {/* Play / Pause Toggle */}
        <button
          type="button"
          onClick={onTogglePlayPause}
          className={`p-1 sm:p-1.5 rounded-md font-bold transition active:scale-90 ${
            isClockRunning
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30'
          } shadow-xs`}
          title={isClockRunning ? 'Pause Match Clock' : 'Start Match Clock'}
        >
          {isClockRunning ? (
            <Pause className="w-3 h-3 fill-current" />
          ) : (
            <Play className="w-3 h-3 fill-current ml-0.5" />
          )}
        </button>

        {/* Reset Clock */}
        <button
          type="button"
          onClick={onResetClock}
          className="p-1 text-slate-400 hover:text-slate-200 active:scale-90 transition hidden xs:block"
          title="Reset Match Clock to 00:00"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      {/* Right on Larger Screens: Directly Visible Buttons */}
      <div className="hidden sm:flex items-center gap-1.5 shrink-0">
        {/* Timeline Log Button */}
        <button
          type="button"
          onClick={onOpenTimeline}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg border transition active:scale-95 text-xs font-semibold ${
            subCount > 0
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/80'
              : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
          }`}
          title="Open Substitution Timeline Log"
        >
          <History className="w-3.5 h-3.5 text-emerald-400" />
          <span>Timeline</span>
          {subCount > 0 && (
            <span className="px-1 py-0.2 rounded-full bg-emerald-500 text-slate-950 font-bold text-[9px] font-mono leading-none">
              {subCount}
            </span>
          )}
        </button>

        {/* Reset Timers (Warning Button) */}
        <button
          type="button"
          onClick={onRequestResetTimers}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-950/50 hover:bg-red-900/70 border border-red-800/80 text-red-300 transition active:scale-95 text-xs font-semibold"
          title="Reset All Player Timers"
        >
          <Flame className="w-3.5 h-3.5 text-red-400" />
          <span>Reset</span>
        </button>

        {/* Export / Backup JSON */}
        <button
          type="button"
          onClick={onOpenExportImport}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition active:scale-95"
          title="Backup & Restore (JSON)"
        >
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right on Smaller Screens: Hamburger Menu */}
      <div className="sm:hidden relative shrink-0" ref={menuRef}>
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`relative p-1.5 rounded-lg border transition active:scale-90 ${
            isMenuOpen
              ? 'bg-blue-600 border-blue-500 text-white'
              : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
          }`}
          title="Open Menu"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          {subCount > 0 && !isMenuOpen && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
          )}
        </button>

        {/* Dropdown Menu Popup */}
        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-52 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-50 text-white animate-fade-in divide-y divide-slate-800/60">
            <div className="py-1 space-y-1">
              {/* Timeline Option */}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenTimeline();
                }}
                className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-slate-800/80 text-left text-xs font-semibold text-slate-200 transition"
              >
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-emerald-400" />
                  <span>Substitution Timeline</span>
                </div>
                {subCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-slate-950 font-bold text-[9px] font-mono">
                    {subCount}
                  </span>
                )}
              </button>

              {/* Download / Backup Option */}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenExportImport();
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-slate-800/80 text-left text-xs font-semibold text-slate-200 transition"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Backup / Export (JSON)</span>
              </button>
            </div>

            <div className="py-1 space-y-1">
              {/* Reset Clock Option */}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onResetClock();
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-slate-800/80 text-left text-xs font-semibold text-slate-300 transition"
              >
                <RotateCcw className="w-4 h-4 text-slate-400" />
                <span>Reset Match Clock (00:00)</span>
              </button>

              {/* Reset All Timers Warning Option */}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onRequestResetTimers();
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-red-950/60 text-left text-xs font-semibold text-red-300 transition"
              >
                <Flame className="w-4 h-4 text-red-400" />
                <span>Reset All Timers (00:00)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
