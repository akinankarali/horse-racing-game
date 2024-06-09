export interface Horse {
    id: number;
    title: string;
    color: string;
    condition: number;
    position?: number ;
  }
  
  export interface RaceState {
    horses: Horse[];
    selectedHorses: Horse[][];
    raceSchedule: number[];
    raceResults: string[];
    currentRound: number;
  }