import React, { useState } from 'react';
import { Player } from '../types';
import { PlayerToken } from './PlayerToken';
import { ArrowUpDown, Users, UserPlus, SlidersHorizontal } from 'lucide-react';

interface BenchTrayProps {
  benchPlayers: Player[];
  stagedPlayerIds: Set<string>;
  onStartDrag: (e: React.PointerEvent, player: Player) => void;
  onOpenRosterModal: () => void;
  onQuickAddPlayer: () => void;
  onBenchPlayerClick?: (player: Player) => void;
}

type SortOption = 'timeAsc' | 'timeDesc' | 'number' | 'name';

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
      {/* Compressed Sub-header / Filter & Controls */}
      <div className="flex items-center justify-between px-2.5 py-1.5 bg-slate-950/80 border-b border-slate-800/80 gap-1.5 shrink-0 h-9">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-300">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span className="uppercase">Bench</span>
            <span className="px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-mono font-bold">
              {benchPlayers.length}
            </span>
          </div>
        </div>

        {/* Sort & Quick actions */}
        <div className="flex items-center gap-1">
          {/* Sort Selector */}
          <div className="flex items-center bg-slate-800 rounded border border-slate-700/80 px-1 py-0.5 text-[10px] text-slate-300">
            <ArrowUpDown className="w-2.5 h-2.5 text-slate-400 mr-0.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer text-[10px]"
              title="Sort bench players"
            >
              <option value="timeAsc" className="bg-slate-900">Least Mins</option>
              <option value="timeDesc" className="bg-slate-900">Most Mins</option>
              <option value="number" className="bg-slate-900"># Number</option>
              <option value="name" className="bg-slate-900">Name</option>
            </select>
          </div>

          {/* Quick Add Player */}
          <button
            type="button"
            onClick={onQuickAddPlayer}
            className="flex items-center gap-1 px-1.5 py-1 rounded bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-[10px] font-semibold transition"
            title="Add a new player"
          >
            <UserPlus className="w-3 h-3" />
            <span className="hidden xs:inline">Add</span>
          </button>

          {/* Roster Manager */}
          <button
            type="button"
            onClick={onOpenRosterModal}
            className="flex items-center gap-1 px-1.5 py-1 rounded bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 text-[10px] font-semibold border border-slate-700 transition"
            title="Manage Team Roster"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span className="hidden xs:inline">Roster</span>
          </button>
        </div>
      </div>

      {/* Bench Scrollable Player Grid (Tight, high-density for small screens) */}
      <div className="flex-1 overflow-y-auto p-2 touch-pan-y">
        {sorted.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-3 text-slate-500">
            <Users className="w-6 h-6 mb-1 opacity-40" />
            <p className="text-xs font-medium text-slate-400">All players are currently on the field</p>
            <button
              onClick={onQuickAddPlayer}
              className="mt-1 text-xs text-blue-400 underline hover:text-blue-300"
            >
              + Add player to bench
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-5 xs:grid-cols-6 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-11 gap-1.5 items-center justify-items-center">
            {sorted.map((player) => {
              const isStaged = stagedPlayerIds.has(player.id);
              return (
                <div
                  key={player.id}
                  className={`relative p-0.5 rounded-lg transition-all ${
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
                      <span className="bg-emerald-600/90 text-white text-[8px] font-bold px-1 py-0.2 rounded shadow">
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

      {/* Ultra-compact instruction footer */}
      <div className="px-2 py-0.5 bg-slate-950/80 border-t border-slate-800/60 text-[9px] text-slate-400 flex items-center justify-between shrink-0">
        <span className="truncate">💡 Drag onto pitch or drop over active player to sub</span>
        <span className="text-slate-500 font-mono text-[8px] hidden xs:inline shrink-0 ml-1">Live Timers</span>
      </div>
    </div>
  );
};
