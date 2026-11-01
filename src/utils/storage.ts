import { AppState, Player, SportType } from '../types';

export const STORAGE_KEY = 'coachsub_lineup_v2';

export const DEFAULT_SOCCER_ROSTER: Player[] = [
  // Starting 11 (distributed across half field, goal assumed on Left by default)
  { id: 'p1', name: 'Alisson', number: '1', position: 'GK', color: '#eab308', isOnField: true, fieldPosition: { x: 12, y: 50 }, totalSeconds: 0 },
  { id: 'p2', name: 'Trent', number: '66', position: 'RB', color: '#3b82f6', isOnField: true, fieldPosition: { x: 28, y: 18 }, totalSeconds: 0 },
  { id: 'p3', name: 'Virgil', number: '4', position: 'CB', color: '#3b82f6', isOnField: true, fieldPosition: { x: 24, y: 38 }, totalSeconds: 0 },
  { id: 'p4', name: 'Ibou', number: '5', position: 'CB', color: '#3b82f6', isOnField: true, fieldPosition: { x: 24, y: 62 }, totalSeconds: 0 },
  { id: 'p5', name: 'Robbo', number: '26', position: 'LB', color: '#3b82f6', isOnField: true, fieldPosition: { x: 28, y: 82 }, totalSeconds: 0 },
  { id: 'p6', name: 'Ryan', number: '38', position: 'DM', color: '#3b82f6', isOnField: true, fieldPosition: { x: 44, y: 50 }, totalSeconds: 0 },
  { id: 'p7', name: 'Alexis', number: '10', position: 'CM', color: '#3b82f6', isOnField: true, fieldPosition: { x: 55, y: 32 }, totalSeconds: 0 },
  { id: 'p8', name: 'Dominik', number: '8', position: 'AM', color: '#3b82f6', isOnField: true, fieldPosition: { x: 58, y: 68 }, totalSeconds: 0 },
  { id: 'p9', name: 'Mo Salah', number: '11', position: 'RW', color: '#3b82f6', isOnField: true, fieldPosition: { x: 78, y: 20 }, totalSeconds: 0 },
  { id: 'p10', name: 'Darwin', number: '9', position: 'ST', color: '#3b82f6', isOnField: true, fieldPosition: { x: 82, y: 50 }, totalSeconds: 0 },
  { id: 'p11', name: 'Lucho', number: '7', position: 'LW', color: '#3b82f6', isOnField: true, fieldPosition: { x: 78, y: 80 }, totalSeconds: 0 },
  // Bench
  { id: 'p12', name: 'Cody', number: '18', position: 'FWD', color: '#3b82f6', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'p13', name: 'Curtis', number: '17', position: 'MID', color: '#3b82f6', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'p14', name: 'Harvey', number: '19', position: 'MID', color: '#3b82f6', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'p15', name: 'Conor', number: '84', position: 'DEF', color: '#3b82f6', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'p16', name: 'Joe', number: '2', position: 'DEF', color: '#3b82f6', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'p17', name: 'Kelleher', number: '62', position: 'GK', color: '#eab308', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'p18', name: 'Wataru', number: '3', position: 'MID', color: '#3b82f6', isOnField: false, fieldPosition: null, totalSeconds: 0 },
];

export const DEFAULT_HOCKEY_ROSTER: Player[] = [
  { id: 'h1', name: 'Shesterkin', number: '31', position: 'G', color: '#0284c7', isOnField: true, fieldPosition: { x: 12, y: 50 }, totalSeconds: 0 },
  { id: 'h2', name: 'Fox', number: '23', position: 'D', color: '#0284c7', isOnField: true, fieldPosition: { x: 32, y: 28 }, totalSeconds: 0 },
  { id: 'h3', name: 'Lindgren', number: '55', position: 'D', color: '#0284c7', isOnField: true, fieldPosition: { x: 32, y: 72 }, totalSeconds: 0 },
  { id: 'h4', name: 'Kreider', number: '20', position: 'LW', color: '#0284c7', isOnField: true, fieldPosition: { x: 70, y: 25 }, totalSeconds: 0 },
  { id: 'h5', name: 'Zibanejad', number: '93', position: 'C', color: '#0284c7', isOnField: true, fieldPosition: { x: 62, y: 50 }, totalSeconds: 0 },
  { id: 'h6', name: 'Panarin', number: '10', position: 'RW', color: '#0284c7', isOnField: true, fieldPosition: { x: 70, y: 75 }, totalSeconds: 0 },
  // Bench / Forward Lines & D-Pairs
  { id: 'h7', name: 'Trocheck', number: '16', position: 'C', color: '#0284c7', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'h8', name: 'Lafrenière', number: '13', position: 'LW', color: '#0284c7', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'h9', name: 'Cuylle', number: '50', position: 'RW', color: '#0284c7', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'h10', name: 'Schneider', number: '4', position: 'D', color: '#0284c7', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'h11', name: 'Miller', number: '79', position: 'D', color: '#0284c7', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'h12', name: 'Quick', number: '32', position: 'G', color: '#eab308', isOnField: false, fieldPosition: null, totalSeconds: 0 },
];

export const DEFAULT_LACROSSE_ROSTER: Player[] = [
  { id: 'l1', name: 'Goalie', number: '1', position: 'G', color: '#d97706', isOnField: true, fieldPosition: { x: 14, y: 50 }, totalSeconds: 0 },
  { id: 'l2', name: 'Close Def 1', number: '3', position: 'D', color: '#059669', isOnField: true, fieldPosition: { x: 30, y: 30 }, totalSeconds: 0 },
  { id: 'l3', name: 'Close Def 2', number: '4', position: 'D', color: '#059669', isOnField: true, fieldPosition: { x: 26, y: 50 }, totalSeconds: 0 },
  { id: 'l4', name: 'Close Def 3', number: '5', position: 'D', color: '#059669', isOnField: true, fieldPosition: { x: 30, y: 70 }, totalSeconds: 0 },
  { id: 'l5', name: 'LSM / Wing', number: '15', position: 'LSM', color: '#059669', isOnField: true, fieldPosition: { x: 48, y: 22 }, totalSeconds: 0 },
  { id: 'l6', name: 'Midfielder 1', number: '8', position: 'M', color: '#059669', isOnField: true, fieldPosition: { x: 55, y: 50 }, totalSeconds: 0 },
  { id: 'l7', name: 'Midfielder 2', number: '9', position: 'M', color: '#059669', isOnField: true, fieldPosition: { x: 48, y: 78 }, totalSeconds: 0 },
  { id: 'l8', name: 'Attack 1', number: '21', position: 'A', color: '#059669', isOnField: true, fieldPosition: { x: 78, y: 28 }, totalSeconds: 0 },
  { id: 'l9', name: 'Attack 2 (X)', number: '22', position: 'A', color: '#059669', isOnField: true, fieldPosition: { x: 84, y: 50 }, totalSeconds: 0 },
  { id: 'l10', name: 'Attack 3', number: '23', position: 'A', color: '#059669', isOnField: true, fieldPosition: { x: 78, y: 72 }, totalSeconds: 0 },
  // Bench
  { id: 'l11', name: 'Sub Mid 1', number: '11', position: 'M', color: '#059669', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'l12', name: 'Sub Mid 2', number: '12', position: 'M', color: '#059669', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'l13', name: 'Sub Attack', number: '25', position: 'A', color: '#059669', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'l14', name: 'Sub Defense', number: '33', position: 'D', color: '#059669', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'l15', name: 'FOGO (Faceoff)', number: '77', position: 'FO', color: '#059669', isOnField: false, fieldPosition: null, totalSeconds: 0 },
];

export const DEFAULT_FIELD_HOCKEY_ROSTER: Player[] = [
  { id: 'fh1', name: 'Keeper', number: '1', position: 'GK', color: '#ea580c', isOnField: true, fieldPosition: { x: 12, y: 50 }, totalSeconds: 0 },
  { id: 'fh2', name: 'Sweeper', number: '2', position: 'SW', color: '#0d9488', isOnField: true, fieldPosition: { x: 22, y: 50 }, totalSeconds: 0 },
  { id: 'fh3', name: 'Right Back', number: '3', position: 'RB', color: '#0d9488', isOnField: true, fieldPosition: { x: 28, y: 22 }, totalSeconds: 0 },
  { id: 'fh4', name: 'Left Back', number: '4', position: 'LB', color: '#0d9488', isOnField: true, fieldPosition: { x: 28, y: 78 }, totalSeconds: 0 },
  { id: 'fh5', name: 'Right Half', number: '5', position: 'RH', color: '#0d9488', isOnField: true, fieldPosition: { x: 45, y: 20 }, totalSeconds: 0 },
  { id: 'fh6', name: 'Center Half', number: '6', position: 'CH', color: '#0d9488', isOnField: true, fieldPosition: { x: 42, y: 50 }, totalSeconds: 0 },
  { id: 'fh7', name: 'Left Half', number: '7', position: 'LH', color: '#0d9488', isOnField: true, fieldPosition: { x: 45, y: 80 }, totalSeconds: 0 },
  { id: 'fh8', name: 'Right Wing', number: '8', position: 'RW', color: '#0d9488', isOnField: true, fieldPosition: { x: 74, y: 20 }, totalSeconds: 0 },
  { id: 'fh9', name: 'Inside Right', number: '9', position: 'IR', color: '#0d9488', isOnField: true, fieldPosition: { x: 68, y: 38 }, totalSeconds: 0 },
  { id: 'fh10', name: 'Center Forward', number: '10', position: 'CF', color: '#0d9488', isOnField: true, fieldPosition: { x: 80, y: 50 }, totalSeconds: 0 },
  { id: 'fh11', name: 'Left Wing', number: '11', position: 'LW', color: '#0d9488', isOnField: true, fieldPosition: { x: 74, y: 80 }, totalSeconds: 0 },
  // Bench
  { id: 'fh12', name: 'Sub Mid', number: '14', position: 'MID', color: '#0d9488', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'fh13', name: 'Sub Fwd', number: '15', position: 'FWD', color: '#0d9488', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'fh14', name: 'Sub Def', number: '16', position: 'DEF', color: '#0d9488', isOnField: false, fieldPosition: null, totalSeconds: 0 },
];

export const DEFAULT_RUGBY_ROSTER: Player[] = [
  // Forwards (Packs)
  { id: 'rg1', name: 'Loosehead Prop', number: '1', position: 'PROP', color: '#b91c1c', isOnField: true, fieldPosition: { x: 38, y: 32 }, totalSeconds: 0 },
  { id: 'rg2', name: 'Hooker', number: '2', position: 'HKR', color: '#b91c1c', isOnField: true, fieldPosition: { x: 38, y: 50 }, totalSeconds: 0 },
  { id: 'rg3', name: 'Tighthead Prop', number: '3', position: 'PROP', color: '#b91c1c', isOnField: true, fieldPosition: { x: 38, y: 68 }, totalSeconds: 0 },
  { id: 'rg4', name: 'Lock 4', number: '4', position: 'LOCK', color: '#b91c1c', isOnField: true, fieldPosition: { x: 30, y: 40 }, totalSeconds: 0 },
  { id: 'rg5', name: 'Lock 5', number: '5', position: 'LOCK', color: '#b91c1c', isOnField: true, fieldPosition: { x: 30, y: 60 }, totalSeconds: 0 },
  { id: 'rg6', name: 'Blindside Flanker', number: '6', position: 'FLK', color: '#b91c1c', isOnField: true, fieldPosition: { x: 26, y: 26 }, totalSeconds: 0 },
  { id: 'rg7', name: 'Openside Flanker', number: '7', position: 'FLK', color: '#b91c1c', isOnField: true, fieldPosition: { x: 26, y: 74 }, totalSeconds: 0 },
  { id: 'rg8', name: 'Number 8', number: '8', position: 'N8', color: '#b91c1c', isOnField: true, fieldPosition: { x: 22, y: 50 }, totalSeconds: 0 },
  // Backs
  { id: 'rg9', name: 'Scrum-half', number: '9', position: 'SH', color: '#b91c1c', isOnField: true, fieldPosition: { x: 48, y: 50 }, totalSeconds: 0 },
  { id: 'rg10', name: 'Fly-half', number: '10', position: 'FH', color: '#b91c1c', isOnField: true, fieldPosition: { x: 56, y: 40 }, totalSeconds: 0 },
  { id: 'rg11', name: 'Left Wing', number: '11', position: 'WG', color: '#b91c1c', isOnField: true, fieldPosition: { x: 74, y: 16 }, totalSeconds: 0 },
  { id: 'rg12', name: 'Inside Centre', number: '12', position: 'IC', color: '#b91c1c', isOnField: true, fieldPosition: { x: 64, y: 35 }, totalSeconds: 0 },
  { id: 'rg13', name: 'Outside Centre', number: '13', position: 'OC', color: '#b91c1c', isOnField: true, fieldPosition: { x: 70, y: 48 }, totalSeconds: 0 },
  { id: 'rg14', name: 'Right Wing', number: '14', position: 'WG', color: '#b91c1c', isOnField: true, fieldPosition: { x: 74, y: 84 }, totalSeconds: 0 },
  { id: 'rg15', name: 'Fullback', number: '15', position: 'FB', color: '#b91c1c', isOnField: true, fieldPosition: { x: 84, y: 50 }, totalSeconds: 0 },
  // Bench (Finisher replacements)
  { id: 'rg16', name: 'Sub Prop 1', number: '16', position: 'PROP', color: '#b91c1c', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'rg17', name: 'Sub Hooker', number: '17', position: 'HKR', color: '#b91c1c', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'rg18', name: 'Sub Prop 2', number: '18', position: 'PROP', color: '#b91c1c', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'rg19', name: 'Sub Lock', number: '19', position: 'LOCK', color: '#b91c1c', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'rg20', name: 'Sub Back Row', number: '20', position: 'FLK', color: '#b91c1c', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'rg21', name: 'Sub Half-Back', number: '21', position: 'SH', color: '#b91c1c', isOnField: false, fieldPosition: null, totalSeconds: 0 },
  { id: 'rg22', name: 'Sub Back', number: '22', position: 'UB', color: '#b91c1c', isOnField: false, fieldPosition: null, totalSeconds: 0 },
];

export function getDefaultState(): AppState {
  return {
    version: 2,
    settings: {
      teamName: 'United FC',
      sport: 'soccer',
      goalSide: 'left',
      playersPerSide: 11,
      autoTickWithGameClock: true,
    },
    players: DEFAULT_SOCCER_ROSTER,
    matchClock: {
      seconds: 0,
      isRunning: false,
      period: '1st Half',
    },
    subLogs: [],
  };
}

export function loadAppState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.players)) {
      return {
        ...getDefaultState(),
        ...parsed,
        settings: { ...getDefaultState().settings, ...parsed.settings },
        matchClock: { ...getDefaultState().matchClock, ...parsed.matchClock },
      };
    }
  } catch (e) {
    console.error('Failed to load CoachSub state from storage:', e);
  }
  return getDefaultState();
}

export function saveAppState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save CoachSub state:', e);
  }
}

export function formatSeconds(totalSecs: number): string {
  const rounded = Math.max(0, Math.floor(totalSecs));
  const m = Math.floor(rounded / 60);
  const s = rounded % 60;
  if (m >= 60) {
    const h = Math.floor(m / 60);
    const remM = m % 60;
    return `${h}:${remM.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function exportToJsonFile(state: AppState) {
  const jsonString = JSON.stringify(state, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const dateStr = new Date().toISOString().slice(0, 10);
  const teamSanitized = state.settings.teamName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  link.download = `coachsub-${teamSanitized}-${dateStr}.json`;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getPresetRosterForSport(sport: SportType): Player[] {
  switch (sport) {
    case 'soccer':
      return DEFAULT_SOCCER_ROSTER;
    case 'hockey':
      return DEFAULT_HOCKEY_ROSTER;
    case 'lacrosse':
      return DEFAULT_LACROSSE_ROSTER;
    case 'field_hockey':
      return DEFAULT_FIELD_HOCKEY_ROSTER;
    case 'rugby':
      return DEFAULT_RUGBY_ROSTER;
    default:
      return DEFAULT_SOCCER_ROSTER;
  }
}
