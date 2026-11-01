import React, { useState, useRef, useEffect } from 'react';
import { GoalSide, Language, SportType } from '../types';
import { formatSeconds } from '../utils/storage';
import { t, SUPPORTED_LANGUAGES } from '../utils/i18n';
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
  Printer,
  RefreshCw,
  Sparkles,
  Settings,
  Users,
} from 'lucide-react';

interface MatchClockProps {
  language: Language;
  onOpenSettings: () => void;
  onOpenRoster: () => void;
  sport: SportType;
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
  onOpenPrintModal: () => void;
  subCount: number;
  isUpdateAvailable: boolean;
  isCheckingUpdate: boolean;
  updateStatus: string | null;
  onCheckForUpdates: () => void;
  onForceUpdate: () => void;
  teamName?: string;
}

const PERIOD_OPTIONS: Record<SportType, string[]> = {
  soccer: ['1st Half', '2nd Half', 'Extra Time', 'Penalties'],
  hockey: ['1st Per', '2nd Per', '3rd Per', 'OT', 'Shootout'],
  lacrosse: ['1st Qtr', '2nd Qtr', '3rd Qtr', '4th Qtr', 'OT'],
  field_hockey: ['1st Qtr', '2nd Qtr', '3rd Qtr', '4th Qtr', 'Shootout'],
  rugby: ['1st Half', '2nd Half', 'Extra Time', 'Sudden Death'],
};

const SPORT_EMOJIS: Record<SportType, string> = {
  soccer: '⚽',
  hockey: '🏒',
  lacrosse: '🥍',
  field_hockey: '🏑',
  rugby: '🏉',
};

function getPeriodDisplay(p: string, lang: Language): string {
  switch (p) {
    case '1st Half': return t('period_1st_half', lang);
    case '2nd Half': return t('period_2nd_half', lang);
    case 'Extra Time': return t('period_extra_time', lang);
    case 'Penalties': return t('period_penalties', lang);
    case '1st Per': return t('period_1st_per', lang);
    case '2nd Per': return t('period_2nd_per', lang);
    case '3rd Per': return t('period_3rd_per', lang);
    case 'OT': return t('period_ot', lang);
    case 'Shootout': return t('period_shootout', lang);
    case '1st Qtr': return t('period_1st_qtr', lang);
    case '2nd Qtr': return t('period_2nd_qtr', lang);
    case '3rd Qtr': return t('period_3rd_qtr', lang);
    case '4th Qtr': return t('period_4th_qtr', lang);
    case 'Sudden Death': return t('period_sudden_death', lang);
    default: return p;
  }
}

export const MatchClock: React.FC<MatchClockProps> = ({
  language,
  onOpenSettings,
  onOpenRoster,
  sport,
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
  onOpenPrintModal,
  subCount,
  isUpdateAvailable,
  isCheckingUpdate,
  updateStatus,
  onCheckForUpdates,
  onForceUpdate,
  teamName,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const periods = PERIOD_OPTIONS[sport] || PERIOD_OPTIONS.soccer;
  const currentFlag = SUPPORTED_LANGUAGES.find((l) => l.code === language)?.flag || '🇨🇦';

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
      {/* Left: Settings / Sport Trigger & Flip Field Button */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        {/* Settings button with sport emoji & flag indicator */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 active:bg-slate-600 text-xs font-bold text-slate-100 border border-slate-700/80 transition active:scale-95 shadow-xs cursor-pointer"
          title={`${t('settings', language)} & ${t('field_sport', language)}`}
          aria-label={t('settings', language)}
        >
          <span className="text-sm leading-none" role="img" aria-label={sport}>
            {SPORT_EMOJIS[sport] || '⚽'}
          </span>
          <Settings className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] text-slate-300 hidden md:inline truncate max-w-[90px]">
            {teamName || t('settings', language)}
          </span>
          <span className="text-[11px] leading-none ml-0.5">{currentFlag}</span>
        </button>

        {/* Flip Field Direction Button */}
        <button
          type="button"
          onClick={onFlipField}
          className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-xs font-semibold text-slate-200 border border-slate-700/80 transition active:scale-95 shadow-xs cursor-pointer"
          title={`${t('flipField', language)} (${t('goal', language)}: ${goalSide.toUpperCase()})`}
          aria-label={t('flipField', language)}
        >
          <FlipHorizontal className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] text-blue-400 font-mono font-black uppercase">
            {goalSide === 'left' ? 'L' : 'R'}
          </span>
        </button>
      </div>

      {/* Center: Digital Clock & Match Controls */}
      <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-900/90 rounded-lg px-1.5 sm:px-2 py-0.5 border border-slate-800 shadow-inner">
        {/* Period Selector */}
        <select
          value={period}
          onChange={(e) => onChangePeriod(e.target.value)}
          className="bg-transparent text-slate-300 text-[11px] sm:text-xs font-semibold focus:outline-none cursor-pointer max-w-[70px] sm:max-w-none"
          title={t('period', language)}
        >
          {periods.map((p) => (
            <option key={p} value={p} className="bg-slate-900 text-white">
              {getPeriodDisplay(p, language)}
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
          className={`p-1 sm:p-1.5 rounded-md font-bold transition active:scale-90 cursor-pointer ${
            isClockRunning
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30'
          } shadow-xs`}
          title={isClockRunning ? t('pauseClock', language) : t('startClock', language)}
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
          className="p-1 text-slate-400 hover:text-slate-200 active:scale-90 transition hidden xs:block cursor-pointer"
          title={t('resetClock', language)}
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      {/* Right on Larger Screens: Direct Action Buttons */}
      <div className="hidden sm:flex items-center gap-1.5 shrink-0">
        {/* Update Notification Pill if update available */}
        {isUpdateAvailable && (
          <button
            type="button"
            onClick={onForceUpdate}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow-md animate-pulse cursor-pointer"
            title={t('update_ready', language)}
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span className="text-white">{t('update_now', language)}</span>
          </button>
        )}

        {/* Roster Button */}
        <button
          type="button"
          onClick={onOpenRoster}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition active:scale-95 cursor-pointer"
          title={t('roster_title', language)}
        >
          <Users className="w-3.5 h-3.5 text-blue-400" />
          <span>{t('roster', language)}</span>
        </button>

        {/* Timeline Log Button */}
        <button
          type="button"
          onClick={onOpenTimeline}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg border transition active:scale-95 text-xs font-semibold cursor-pointer ${
            subCount > 0
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/80'
              : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
          }`}
          title={t('substitution_history', language)}
        >
          <History className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t('timeline', language)}</span>
          {subCount > 0 && (
            <span className="px-1 py-0.2 rounded-full bg-emerald-500 text-slate-950 font-bold text-[9px] font-mono leading-none">
              {subCount}
            </span>
          )}
        </button>

        {/* Printable PDF Report */}
        <button
          type="button"
          onClick={onOpenPrintModal}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition active:scale-95 cursor-pointer"
          title={t('printPdf', language)}
        >
          <Printer className="w-3.5 h-3.5 text-blue-400" />
        </button>

        {/* Reset Timers (Warning Button) */}
        <button
          type="button"
          onClick={onRequestResetTimers}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-950/50 hover:bg-red-900/70 border border-red-800/80 text-red-300 transition active:scale-95 text-xs font-semibold cursor-pointer"
          title={t('resetTimers', language)}
        >
          <Flame className="w-3.5 h-3.5 text-red-400" />
          <span>{t('reset', language)}</span>
        </button>

        {/* Settings button */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition active:scale-95 cursor-pointer"
          title={t('settings_title', language)}
        >
          <Settings className="w-3.5 h-3.5 text-slate-300" />
        </button>

        {/* Export / Backup JSON */}
        <button
          type="button"
          onClick={onOpenExportImport}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition active:scale-95 cursor-pointer"
          title={t('backupTransfer', language)}
        >
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right on Smaller Screens: Hamburger Menu */}
      <div className="sm:hidden relative shrink-0" ref={menuRef}>
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`relative p-1.5 rounded-lg border transition active:scale-90 cursor-pointer ${
            isMenuOpen
              ? 'bg-blue-600 border-blue-500 text-white'
              : isUpdateAvailable
              ? 'bg-emerald-600/90 border-emerald-400 text-white animate-pulse'
              : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
          }`}
          title="Open Menu"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}

          {/* Update Available Badge */}
          {isUpdateAvailable && !isMenuOpen && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-ping" />
          )}

          {/* Sub Count Badge when no update */}
          {!isUpdateAvailable && subCount > 0 && !isMenuOpen && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
          )}
        </button>

        {/* Dropdown Menu Popup */}
        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-60 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-50 text-white animate-fade-in divide-y divide-slate-800/60 max-h-[85vh] overflow-y-auto">
            {/* Update Banner in Menu */}
            {isUpdateAvailable ? (
              <div className="p-2 mb-1 bg-emerald-950/80 border border-emerald-500/60 rounded-lg space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('update_ready', language)}!</span>
                </div>
                <p className="text-[10px] text-slate-300">{t('update_desc', language)}</p>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onForceUpdate();
                  }}
                  className="w-full py-1.5 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs text-center shadow transition active:scale-95 cursor-pointer"
                >
                  {t('update_now', language)}
                </button>
              </div>
            ) : null}

            {/* Primary Actions: Settings & Roster */}
            <div className="py-1 space-y-0.5">
              {/* Settings (Sport + Language) */}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenSettings();
                }}
                className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-slate-800/80 text-left text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-blue-400" />
                  <span>{t('settings', language)}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                  <span>{SPORT_EMOJIS[sport]}</span>
                  <span>{currentFlag}</span>
                </div>
              </button>

              {/* Roster Management */}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenRoster();
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-slate-800/80 text-left text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                <Users className="w-4 h-4 text-emerald-400" />
                <span>{t('roster_title', language)}</span>
              </button>

              {/* Timeline Option */}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenTimeline();
                }}
                className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-slate-800/80 text-left text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-emerald-400" />
                  <span>{t('timeline', language)}</span>
                </div>
                {subCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-slate-950 font-bold text-[9px] font-mono">
                    {subCount}
                  </span>
                )}
              </button>

              {/* Printable PDF Report Option */}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenPrintModal();
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-slate-800/80 text-left text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                <Printer className="w-4 h-4 text-blue-400" />
                <span>{t('printPdf', language)}</span>
              </button>

              {/* Download / Backup Option */}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenExportImport();
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-slate-800/80 text-left text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>{t('backupTransfer', language)}</span>
              </button>
            </div>

            {/* App Updates Section */}
            <div className="py-1 space-y-1">
              <button
                type="button"
                onClick={() => {
                  if (isUpdateAvailable) {
                    setIsMenuOpen(false);
                    onForceUpdate();
                  } else {
                    onCheckForUpdates();
                  }
                }}
                className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-slate-800/80 text-left text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <RefreshCw className={`w-4 h-4 text-emerald-400 ${isCheckingUpdate ? 'animate-spin' : ''}`} />
                  <span>{isUpdateAvailable ? t('update_now', language) : t('check_updates', language)}</span>
                </div>
              </button>

              {updateStatus && (
                <div className="px-2.5 py-1 text-[10px] text-emerald-300/90 font-medium bg-emerald-950/40 rounded">
                  {updateStatus}
                </div>
              )}
            </div>

            {/* Reset Actions Section */}
            <div className="py-1 space-y-1">
              {/* Reset Clock Option */}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onResetClock();
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-slate-800/80 text-left text-xs font-semibold text-slate-300 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-slate-400" />
                <span>{t('resetClock', language)}</span>
              </button>

              {/* Reset All Timers Warning Option */}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onRequestResetTimers();
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-red-950/60 text-left text-xs font-semibold text-red-300 transition cursor-pointer"
              >
                <Flame className="w-4 h-4 text-red-400" />
                <span>{t('resetTimers', language)}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
