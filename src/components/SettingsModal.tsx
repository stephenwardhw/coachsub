import React, { useState } from 'react';
import {
  GoalSide,
  Language,
  SportType,
} from '../types';
import {
  SUPPORTED_LANGUAGES,
  t,
} from '../utils/i18n';
import {
  X,
  Languages,
  Trophy,
  FlipHorizontal,
  Volume2,
  VolumeX,
  Check,
  Smartphone,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onUpdateLanguage: (lang: Language) => void;
  currentSport: SportType;
  onUpdateSport: (sport: SportType, loadPreset: boolean) => void;
  goalSide: GoalSide;
  onUpdateGoalSide: (side: GoalSide) => void;
  soundEnabled: boolean;
  onToggleSound: (enabled: boolean) => void;
  teamName: string;
}

interface SportMeta {
  type: SportType;
  emoji: string;
  playersSummary: string;
  key: 'sport_soccer' | 'sport_hockey' | 'sport_lacrosse' | 'sport_field_hockey' | 'sport_rugby';
}

const SPORTS: SportMeta[] = [
  { type: 'soccer', emoji: '⚽', playersSummary: '11 v 11', key: 'sport_soccer' },
  { type: 'hockey', emoji: '🏒', playersSummary: '6 v 6', key: 'sport_hockey' },
  { type: 'lacrosse', emoji: '🥍', playersSummary: '10 v 10', key: 'sport_lacrosse' },
  { type: 'field_hockey', emoji: '🏑', playersSummary: '11 v 11', key: 'sport_field_hockey' },
  { type: 'rugby', emoji: '🏉', playersSummary: '15 v 15', key: 'sport_rugby' },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  language,
  onUpdateLanguage,
  currentSport,
  onUpdateSport,
  goalSide,
  onUpdateGoalSide,
  soundEnabled,
  onToggleSound,
  teamName,
}) => {
  const [selectedSport, setSelectedSport] = useState<SportType>(currentSport);
  const [shouldLoadPreset, setShouldLoadPreset] = useState(false);
  const [showSportConfirm, setShowSportConfirm] = useState(false);

  if (!isOpen) return null;

  const handleSelectSport = (newSport: SportType) => {
    if (newSport === currentSport) return;
    setSelectedSport(newSport);
    setShowSportConfirm(true);
  };

  const handleConfirmSportChange = (loadPreset: boolean) => {
    onUpdateSport(selectedSport, loadPreset);
    setShowSportConfirm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full text-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Languages className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base">{t('settings_title', language)}</h3>
              <p className="text-[11px] text-slate-400">{teamName || 'CoachSub'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-6 overflow-y-auto flex-1">
          {/* 1. LANGUAGE SELECTOR */}
          <section className="space-y-2.5">
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-emerald-400" />
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {t('language', language)}
              </label>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => onUpdateLanguage(lang.code)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition cursor-pointer active:scale-98 ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500 text-white shadow-sm ring-1 ring-blue-500/40'
                        : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xl shrink-0" role="img" aria-label={lang.name}>
                        {lang.flag}
                      </span>
                      <div className="truncate">
                        <div className="text-xs font-bold leading-tight truncate">
                          {lang.nativeName}
                        </div>
                        <div className="text-[10px] text-slate-400 leading-tight">
                          {lang.name}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-blue-400 shrink-0 ml-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 2. FIELD SPORT SELECTION */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {t('field_sport', language)}
                </label>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {t(SPORTS.find((s) => s.type === currentSport)?.key || 'sport_soccer', language)}
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              {t('sport_change_warning', language)}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SPORTS.map((sport) => {
                const isCurrent = currentSport === sport.type;
                return (
                  <button
                    key={sport.type}
                    type="button"
                    onClick={() => handleSelectSport(sport.type)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition cursor-pointer active:scale-95 ${
                      isCurrent
                        ? 'bg-emerald-600/20 border-emerald-500 text-white ring-1 ring-emerald-500/40 shadow-sm'
                        : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-2xl mb-1">{sport.emoji}</span>
                    <span className="text-xs font-bold leading-tight truncate w-full">
                      {t(sport.key, language)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {sport.playersSummary}
                    </span>
                    {isCurrent && (
                      <span className="mt-1.5 px-1.5 py-0.2 rounded-full bg-emerald-500/30 text-emerald-300 text-[9px] font-bold uppercase tracking-wide">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Sport change confirm popup if user picked different sport */}
            {showSportConfirm && (
              <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-500/50 space-y-2.5 animate-fade-in">
                <div className="text-xs font-bold text-amber-200">
                  {t('sport_select_prompt', language)}: {t(SPORTS.find((s) => s.type === selectedSport)?.key || 'sport_soccer', language)}
                </div>
                <p className="text-[11px] text-amber-300/90">
                  {t('load_preset_confirm', language)}
                </p>

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleConfirmSportChange(true)}
                    className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{t('load_preset_roster', language)}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleConfirmSportChange(false)}
                    className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition cursor-pointer"
                  >
                    <span>Keep Current Lineup</span>
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* 3. GOAL ORIENTATION */}
          <section className="space-y-2.5">
            <div className="flex items-center gap-2">
              <FlipHorizontal className="w-4 h-4 text-blue-400" />
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {t('goal_orientation', language)}
              </label>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onUpdateGoalSide('left')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  goalSide === 'left'
                    ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500/40'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="text-xs font-bold mb-0.5 flex items-center gap-1.5">
                  <span className="text-blue-400">←</span>
                  <span>{t('goal', language)}: Left</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  {t('goal_left', language)}
                </div>
              </button>

              <button
                type="button"
                onClick={() => onUpdateGoalSide('right')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  goalSide === 'right'
                    ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500/40'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="text-xs font-bold mb-0.5 flex items-center gap-1.5">
                  <span>{t('goal', language)}: Right</span>
                  <span className="text-blue-400">→</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  {t('goal_right', language)}
                </div>
              </button>
            </div>
          </section>

          {/* 4. SOUND EFFECTS */}
          <section className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200">
                  {t('sound_effects', language)}
                </div>
                <div className="text-[10px] text-slate-400">
                  {soundEnabled ? t('sound_enabled', language) : t('sound_muted', language)}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onToggleSound(!soundEnabled)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-200 cursor-pointer ${
                soundEnabled ? 'bg-emerald-500 justify-end' : 'bg-slate-700 justify-start'
              }`}
              aria-label="Toggle sound"
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md" />
            </button>
          </section>

          {/* 5. APP INFO & OFFLINE BADGE */}
          <section className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {t('app_info', language)}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                CoachSub PWA
              </span>
              <span className="font-mono text-slate-400">v2.2.0</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {t('offline_ready', language)}
              </span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 text-[10px] font-mono border border-emerald-800">
                Active
              </span>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/60 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition cursor-pointer shadow"
          >
            {t('close', language)}
          </button>
        </div>
      </div>
    </div>
  );
};
