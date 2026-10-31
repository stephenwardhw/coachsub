import React from 'react';
import { Player } from '../types';
import { formatSeconds } from '../utils/storage';

interface PlayerTokenProps {
  player: Player;
  isStagedSub?: boolean;
  isBeingReplaced?: boolean;
  stagedSubPlayer?: Player | null; // The player who is staged to replace this one
  isTargeted?: boolean; // When dragging over this player
  size?: 'sm' | 'md' | 'lg';
  showTimer?: boolean;
  showName?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  onPointerDown?: (e: React.PointerEvent) => void;
  className?: string;
}

export const PlayerToken: React.FC<PlayerTokenProps> = ({
  player,
  isStagedSub = false,
  isBeingReplaced = false,
  stagedSubPlayer,
  isTargeted = false,
  size = 'md',
  showTimer = true,
  showName = true,
  interactive = true,
  onClick,
  onPointerDown,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-14 h-14 text-base',
  }[size];

  const badgeColor = player.color || '#3b82f6';

  return (
    <div
      onClick={onClick}
      onPointerDown={onPointerDown}
      className={`relative inline-flex flex-col items-center justify-center select-none ${
        interactive ? 'cursor-grab active:cursor-grabbing touch-none' : ''
      } ${className}`}
    >
      {/* Target indicator ring if another player is being hovered over this player */}
      {isTargeted && (
        <span className="absolute -inset-2.5 rounded-full border-2 border-emerald-400 bg-emerald-500/20 animate-ping pointer-events-none" />
      )}

      {/* Main Jersey Circle Icon */}
      <div
        className={`relative ${sizeClasses} rounded-full flex flex-col items-center justify-center font-black tracking-tight text-white shadow-lg transition-transform duration-150 ${
          isStagedSub
            ? 'ring-3 ring-emerald-400 ring-offset-2 ring-offset-slate-900 bg-emerald-600 scale-95 shadow-emerald-500/40 animate-pulse'
            : isBeingReplaced
            ? 'ring-3 ring-amber-400 ring-offset-2 ring-offset-slate-900 bg-slate-800 border-2 border-amber-400 opacity-90'
            : 'ring-2 ring-white/70 shadow-black/40 hover:scale-105 active:scale-95'
        }`}
        style={{
          backgroundColor: isStagedSub ? '#059669' : badgeColor,
        }}
      >
        {/* Subtle radial inner highlight */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-black/20 pointer-events-none" />

        {/* Staged sub badge marker */}
        {isStagedSub && (
          <span className="absolute -top-2 -left-1 px-1.5 py-0.2 rounded-full bg-emerald-500 text-[8px] font-black text-white uppercase tracking-wider border border-white shadow-xs">
            SUB IN
          </span>
        )}

        {/* Being replaced badge marker */}
        {isBeingReplaced && (
          <span className="absolute -top-2 -left-1 px-1.5 py-0.2 rounded-full bg-amber-500 text-[8px] font-black text-slate-950 uppercase tracking-wider border border-white shadow-xs">
            OUT
          </span>
        )}

        {/* Position tag top right */}
        {player.position && !isStagedSub && (
          <span className="absolute -top-1.5 -right-1 px-1 py-0.2 rounded bg-black/75 text-[8px] font-bold text-amber-300 border border-white/20">
            {player.position}
          </span>
        )}

        {/* Jersey Number */}
        <span className="relative z-10 leading-none drop-shadow-sm font-mono font-extrabold">
          {player.number}
        </span>
      </div>

      {/* Visible Timer Badge */}
      {showTimer && (
        <div
          className={`mt-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold leading-none shadow-sm flex items-center gap-1 border ${
            player.isOnField
              ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/60 animate-pulse'
              : 'bg-slate-900/80 text-slate-300 border-slate-700/60'
          }`}
        >
          {player.isOnField && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
          <span>{formatSeconds(player.totalSeconds)}</span>
        </div>
      )}

      {/* Player Name */}
      {showName && (
        <span
          className="mt-0.5 max-w-[70px] truncate text-center text-[10px] font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] bg-black/40 px-1 rounded"
          title={player.name}
        >
          {player.name}
        </span>
      )}

      {/* Target prompt helper */}
      {isTargeted && (
        <div className="absolute -bottom-5 whitespace-nowrap bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-md pointer-events-none">
          Stage Sub
        </div>
      )}
    </div>
  );
};
