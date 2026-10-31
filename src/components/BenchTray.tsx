import React, { useState } from 'react';
import { Player } from '../types';
import { PlayerToken } from './PlayerToken';
import { ArrowUpDown, Plus, Users, UserPlus, SlidersHorizontal } from 'lucide-react';

interface BenchTrayProps {
  benchPlayers: Player[];
  stagedPlayerIds: Set<string>;
  onStartDrag: (e: React.PointerEvent, player: Player) => void;
  onOpenRosterModal: () => void;
  onQuickAddPlayer: () => void;
  onBenchPlayerClick?: (player: Player) => void;
}

type SortOption = 'number' | 'timeAsc' | 'timeDesc' | 'name';

export const BenchTray: React.FC<BenchTrayProps> = ({
  benchPlayers,
  stagedPlayerIds,
  onStartDrag,
  onOpenRosterModal,
  onQuickAddPlayer,
  onBenchPlayerClick,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('timeAsc'); // least played first is great for coaches
  const [search, setSearch] = useState('');

  const filtered = benchPlayers.filter((p) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(term) ||
      p.number.includes(term) ||
      (p.position && p.position.toLowerCase().includes(term))
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'timeAsc') return a.totalSeconds - b.totalSeconds;
    if (sortBy === 'timeDesc') return b.totalSeconds - a.totalSeconds;
    if (sortBy === 'number') {
      const numA = parseInt(a.number, 10);
      const numB = parseInt(b.number, 10);
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
      return a.number.localeCompare(b.number);
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="flex flex-col h-full bg-slate-900 border-t border-slate-800 select-none overflow-hidden">
      {/* Sub-header / Filter & Controls */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-950/70 border-b border-slate-800/80 gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>BENCH / AVAILABLE</span>
            <span className="px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-mono">
              {benchPlayers.length}
            </span>
          </div>

          <span className="text-[10px] text-slate-500 hidden sm:inline">
            • Drag up onto field or over players to stage sub
          </span>
        </div>

        {/* Sort & Quick actions */}
        <div className="flex items-center gap-1.5">
          {/* Sort Selector */}
          <div className="flex items-center bg-slate-800 rounded-md border border-slate-700 px-1.5 py-1 text-[11px] text-slate-300">
            <ArrowUpDown className="w-3 h-3 text-slate-400 mr-1" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer text-xs"
              title="Sort bench players"
            >
              <option value="timeAsc" className="bg-slate-900">Least Minutes (Resting)</option>
              <option value="timeDesc" className="bg-slate-900">Most Minutes</option>
              <option value="number" className="bg-slate-900">Jersey Number</option>
              <option value="name" className="bg-slate-900">Name</option>
            </select>
          </div>

          {/* Quick Add Player */}
          <button
            type="button"
            onClick={onQuickAddPlayer}
            className="flex items-center gap-1 px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-medium transition"
            title="Add a new player"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>

          {/* Roster Manager */}
          <button
            type="button"
            onClick={onOpenRosterModal}
            className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 text-xs font-medium border border-slate-700 transition"
            title="Manage Team Roster"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Roster</span>
          </button>
        </div>
      </div>

      {/* Bench Scrollable Player Grid */}
      <div className="flex-1 overflow-y-auto p-3 touch-pan-y">
        {sorted.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-500">
            <Users className="w-8 h-8 mb-2 opacity-40" />
            <p className="text-xs font-medium text-slate-400">All players are currently on the field or bench is empty.</p>
            <button
              onClick={onQuickAddPlayer}
              className="mt-2 text-xs text-blue-400 underline hover:text-blue-300"
            >
              Add more players to bench
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 items-center justify-items-center">
            {sorted.map((player) => {
              const isStaged = stagedPlayerIds.has(player.id);
              return (
                <div
                  key={player.id}
                  className={`relative p-1 rounded-xl transition-all ${
                    isStaged
                      ? 'opacity-40 pointer-events-none grayscale'
                      : 'hover:bg-slate-800/60 active:scale-95'
                  }`}
                >
                  <PlayerToken
                    player={player}
                    size="md"
                    showTimer={true}
                    showName={true}
                    interactive={!isStaged}
                    onPointerDown={(e) => {
                      if (!isStaged) {
                        onStartDrag(e, player);
                      }
                    }}
                    onClick={() => {
                      if (onBenchPlayerClick && !isStaged) {
                        onBenchPlayerClick(player);
                      }
                    }}
                  />
                  {isStaged && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="bg-emerald-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                        STAGED
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Helpful mobile drag instructions footer */}
      <div className="px-3 py-1 bg-slate-950/80 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
        <span>💡 Tap & hold player to drag onto pitch or drop onto active player for substitution</span>
        <span className="hidden sm:inline text-slate-500">Active timers count automatically while on pitch</span>
      </div>
    </div>
  );
};
