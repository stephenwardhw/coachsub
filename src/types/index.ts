export type SportType = 'soccer' | 'hockey' | 'lacrosse' | 'field_hockey' | 'rugby';

export type GoalSide = 'left' | 'right';

export interface FieldPosition {
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
}

export interface Player {
  id: string;
  name: string;
  number: string;
  position?: string;
  color?: string; // hex or color name
  isOnField: boolean;
  fieldPosition: FieldPosition | null;
  totalSeconds: number; // cumulative time on field in seconds
  activeSince?: number | null; // timestamp when placed on field or unpaused
  subStagedForPlayerId?: string | null; // ID of on-field player this player is staged to replace
}

export interface SubstitutionLog {
  id: string;
  timestamp: string;
  matchTimeSeconds: number;
  period?: string;
  playerIn: {
    id: string;
    name: string;
    number: string;
    position?: string;
    color?: string;
  };
  playerOut: {
    id: string;
    name: string;
    number: string;
    position?: string;
    color?: string;
    playedSeconds?: number;
  };
}

export interface TeamSettings {
  teamName: string;
  sport: SportType;
  goalSide: GoalSide;
  playersPerSide: number;
  autoTickWithGameClock: boolean;
}

export interface AppState {
  version: number;
  settings: TeamSettings;
  players: Player[];
  matchClock: {
    seconds: number;
    isRunning: boolean;
    period: string;
  };
  subLogs: SubstitutionLog[];
}
