import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { Horse, RaceState } from './types';

const horseTitles = [
  'Şahbatur', 'Bold Pilot', 'Yavuzhan', 'Thunderbolt', 'Jhonny Guitar', 
  'Murphy', 'Majesty', 'Comet', 'Star', 'Galaxy', 
  'Nova', 'Meteor', 'Phoenix', 'Pegasus', 'Ranger', 
  'Rocket', 'Sparrow', 'Eagle', 'Falcon', 'Mustang'
];

export const state = (): RaceState => ({
  horses: [],
  selectedHorses: [[], [], [], [], [], []],
  raceSchedule: [1200, 1400, 1600, 1800, 2000, 2200],
  raceResults: [],
  currentRound: 0,
});

export const getters: GetterTree<RaceState, RaceState> = {
  allHorses: state => state.horses,
  raceResults: state => state.raceResults,
  selectedHorses: state => state.selectedHorses,
  currentRound: state => state.currentRound,
  raceSchedule: state => state.raceSchedule,
};

export const mutations: MutationTree<RaceState> = {
  SET_HORSES(state: RaceState, horses: Horse[]) {
    state.horses = horses;
  },
  SET_SELECTED_HORSES(state: RaceState, horses: Horse[][]) {
    state.selectedHorses = horses;
  },
  ADD_RACE_RESULT(state: RaceState, result: string) {
    state.raceResults.push(result);
  },
  RESET_RACE_RESULTS(state: RaceState) {
    state.raceResults = [];
  },
  UPDATE_HORSE_CONDITION(state: RaceState, updatedHorse: Horse) {
    const horse = state.horses.find(h => h.id === updatedHorse.id);
    if (horse) {
      horse.condition = updatedHorse.condition;
    }
  },
  UpdateCurrentRound(state: RaceState, round: number) {
    state.currentRound = round;
  },
  
};

export const actions: ActionTree<RaceState, RaceState> = {
  generateHorses({ commit }) {
    const shuffledTitles = horseTitles.sort(() => Math.random() - 0.5);
    
    const horses: Horse[] = Array.from({ length: 20 }, (_, i) => {
      const hue = (i * 18) % 360;
      const condition = Math.floor(Math.random() * 100) + 1;
      
      return {
        id: i + 1,
        title: shuffledTitles[i],
        color: `hsl(${hue}, 100%, 50%)`,
        condition: condition < 50 ? 50 : condition,
        position: 0
      };
    });

    commit('SET_HORSES', horses);
  },
  generateRaceSchedule({ commit, state }) {

    const shuffleArray = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
  
    const raceRounds: Horse[][] = [];

    for (let roundIndex = 0; roundIndex < 6; roundIndex++) {
      const roundHorses = [];
      const availableHorses = [...state.horses];
      for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * availableHorses.length);
        const selectedHorse = availableHorses[randomIndex];
  
        roundHorses.push(selectedHorse);
        availableHorses.splice(randomIndex, 1);
      }
  
      raceRounds.push(shuffleArray(roundHorses)); 
    }
  
    commit('SET_SELECTED_HORSES', raceRounds);
  },
  
  async startRace({ commit, state }) {
    commit('RESET_RACE_RESULTS');

    for (let roundIndex = 0; roundIndex < 6; roundIndex++) {
      const distance = state.raceSchedule[roundIndex];
      const roundHorses = state.selectedHorses[roundIndex].map(horse => ({ ...horse }));

      for (let second = 0; second < (6 + roundIndex); second++) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        roundHorses.forEach(horse => {
          horse.condition -= Math.floor(Math.random() * 5) + 1;
          if (horse.condition < 0) {
            horse.condition = 0;
          }
          commit('UPDATE_HORSE_CONDITION', horse);
        });

        const runResult = {
          distance,
          horses: roundHorses.map(horse => ({
            id: horse.id,
            title: horse.title,
            condition: horse.condition,
          })),
        };

        commit('UpdateCurrentRound', roundIndex );
        commit('ADD_RACE_RESULT', runResult);
      }

      const winner = roundHorses.reduce((prev, current) => (prev.condition > current.condition) ? prev : current);
      const winnerResult = `${roundIndex + 1 }: ${winner.title} (${winner.condition})`;

      commit('ADD_RACE_RESULT', {
        distance,
        horses: roundHorses,
        winnerResult,
      });
    }
  },
};