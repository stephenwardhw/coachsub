import React, { useState } from 'react';
import { Player, SportType } from '../types';
import { formatSeconds, getPresetRosterForSport } from '../utils/storage';
import {
  Users,
  UserPlus,
  Trash2,
  Edit2,
  Check,
  X,
  RotateCcw,
  Sparkles,
  Plus,
  Shield,
} from 'lucide-react';

interface RosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  onUpdatePlayers: (players: Player[]) => void;
  sport: SportType;
  teamName: string;
  onUpdateTeamName: (teamName: string) => void;
}

const COLOR_OPTIONS = [
  '#3b82f6', // blue
  '#ef4444', // red
  '#10b981', // green
  '#f59e0b', // amber
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#475569', // slate
];

export const RosterModal: React.FC<RosterModalProps> = ({
  isOpen,
  onClose,
  players,
  onUpdatePlayers,
  sport,
  teamName,
  onUpdateTeamName,
}) => {
  const [currentTeamName, setCurrentTeamName] = useState(teamName);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newPosition, setNewPosition] = useState('');
  const [newColor, setNewColor] = useState(COLOR_OPTIONS[0]);

  // Edit fields
  const [editName, setEditName] = useState('');
  const [editNumber, setEditNumber] = useState('');
  const [editPosition, setEditPosition] = useState('');
  const [editColor, setEditColor] = useState('');

  if (!isOpen) return null;

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newNumber.trim()) return;

    const newPlayer: Player = {
      id: 'p_' + Date.now() + Math.random().toString(36).substring(2, 6),
      name: newName.trim(),
      number: newNumber.trim(),
      position: newPosition.trim().toUpperCase() || undefined,
      color: newColor,
      isOnField: false,
      fieldPosition: null,
      totalSeconds: 0,
    };

    onUpdatePlayers([...players, newPlayer]);
    setNewName('');
    setNewNumber('');
    setNewPosition('');
  };

  const startEdit = (p: Player) => {
    setEditingId(p.id);
    setEditName(p.name);
    setEditNumber(p.number);
    setEditPosition(p.position || '');
    setEditColor(p.color || COLOR_OPTIONS[0]);
  };

  const saveEdit = (id: string) => {
    if (!editName.trim() || !editNumber.trim()) return;
    onUpdatePlayers(
      players.map((p) =>
        p.id === id
          ? {
              ...p,
              name: editName.trim(),
              number: editNumber.trim(),
              position: editPosition.trim().toUpperCase() || undefined,
              color: editColor,
            }
          : p
      )
    );
    setEditingId(null);
  };

  const deletePlayer = (id: string) => {
    if (confirm('Delete this player from roster?')) {
      onUpdatePlayers(players.filter((p) => p.id !== id));
    }
  };

  const handleLoadSportPreset = () => {
    if (
      confirm(
        `Load default starter roster for ${sport}? This will replace your current lineup.`
      )
    ) {
      const preset = getPresetRosterForSport(sport);
      onUpdatePlayers(preset);
    }
  };

  const onFieldCount = players.filter((p) => p.isOnField).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs select-none">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Team Roster Management</h2>
              <p className="text-xs text-slate-400">
                {players.length} Players Total • {onFieldCount} On Pitch • {players.length - onFieldCount} on Bench
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Team Name Setting Card */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <label htmlFor="teamNameInput" className="text-xs font-bold text-white block cursor-pointer">
                  Team Name
                </label>
                <p className="text-[11px] text-slate-400">
                  Displayed on match exports, backups, and reports
                </p>
              </div>
            </div>

            <div className="w-full sm:w-auto flex items-center gap-2">
              <input
                id="teamNameInput"
                type="text"
                value={currentTeamName}
                onChange={(e) => {
                  setCurrentTeamName(e.target.value);
                  onUpdateTeamName(e.target.value);
                }}
                placeholder="e.g. United FC"
                className="w-full sm:w-56 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Add New Player Form */}
          <form
            onSubmit={handleAddPlayer}
            className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-3"
          >
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <UserPlus className="w-4 h-4" />
              <span>Add New Player</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Jersey #
                </label>
                <input
                  type="text"
                  placeholder="10"
                  maxLength={4}
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-mono font-bold text-center text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="sm:col-span-5">
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Player Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Leo Messi"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  placeholder="FWD"
                  maxLength={5}
                  value={newPosition}
                  onChange={(e) => setNewPosition(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm uppercase text-center text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-3 flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 font-bold text-sm text-white shadow-md shadow-blue-600/30 transition flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Player</span>
                </button>
              </div>
            </div>

            {/* Color picker pills */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-400">Jersey Color:</span>
              <div className="flex items-center gap-1.5">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setNewColor(c)}
                    className={`w-5 h-5 rounded-full border transition ${
                      newColor === c ? 'scale-125 border-white ring-2 ring-blue-400' : 'border-transparent opacity-80'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </form>

          {/* Roster Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              <span>Players ({players.length})</span>
              <span>Playing Time</span>
            </div>

            <div className="divide-y divide-slate-800/80 rounded-xl border border-slate-800 bg-slate-950/40 overflow-hidden">
              {players.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  No players in roster. Use the form above to add players, or load default presets.
                </div>
              ) : (
                players.map((p) => {
                  const isEditing = editingId === p.id;

                  if (isEditing) {
                    return (
                      <div
                        key={p.id}
                        className="p-3 bg-slate-800/80 flex flex-wrap items-center gap-2"
                      >
                        <input
                          type="text"
                          value={editNumber}
                          onChange={(e) => setEditNumber(e.target.value)}
                          className="w-14 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm font-mono text-center font-bold"
                          placeholder="#"
                        />
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="flex-1 min-w-[120px] bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm"
                          placeholder="Name"
                        />
                        <input
                          type="text"
                          value={editPosition}
                          onChange={(e) => setEditPosition(e.target.value)}
                          className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs uppercase text-center"
                          placeholder="Pos"
                        />
                        <div className="flex items-center gap-1">
                          {COLOR_OPTIONS.slice(0, 4).map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setEditColor(c)}
                              className={`w-4 h-4 rounded-full ${
                                editColor === c ? 'ring-2 ring-white scale-110' : ''
                              }`}
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => saveEdit(p.id)}
                          className="p-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
                          title="Save"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="p-1.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-300"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={p.id}
                      className="p-2.5 sm:p-3 flex items-center justify-between hover:bg-slate-800/40 transition gap-2"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Jersey icon mini */}
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs text-white shadow-xs shrink-0"
                          style={{ backgroundColor: p.color || '#3b82f6' }}
                        >
                          {p.number}
                        </div>

                        {/* Player name & position */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm truncate text-white">
                              {p.name}
                            </span>
                            {p.position && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                {p.position}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {p.isOnField ? (
                              <span className="text-emerald-400 font-medium">● On Pitch</span>
                            ) : (
                              <span className="text-slate-500">Bench</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Time played & Actions */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="font-mono text-xs font-bold text-emerald-400">
                            {formatSeconds(p.totalSeconds)}
                          </div>
                          <div className="text-[10px] text-slate-500">Played</div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => startEdit(p)}
                            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                            title="Edit player"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deletePlayer(p.id)}
                            className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition"
                            title="Delete player"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800 bg-slate-950/80 shrink-0">
          <button
            type="button"
            onClick={handleLoadSportPreset}
            className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Default {sport.toUpperCase()} Lineup</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-bold text-white shadow-md transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
