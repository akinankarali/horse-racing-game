<template>
  <div class="horse-racing-day">
    <div class="racing-wrapper">
      <div class="information-section">
        <Race />
      </div>

      <div class="race-board-section">
        <h4 v-if="selectedHorses[currentRound].length">
          Round {{ currentRound + 1 }} - {{ raceSchedule[currentRound] }}m
        </h4>
        <RaceBoard />
      </div>
    </div>

    <div class="result-section">
      <Results v-if="selectedHorses[currentRound].length" />
    </div>
  </div>
</template>

<script lang="ts">
import Race from '../components/Race.vue';
import Results from '../components/Results.vue';
import RaceBoard from '../components/RaceBoard.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    Race,
    Results,
    RaceBoard,
  },

  computed: {
    ...mapGetters({
      currentRound: 'currentRound',
      selectedHorses: 'selectedHorses',
      raceSchedule: 'raceSchedule',
    }),
  },
};
</script>

<style scoped lang="scss">
.horse-racing-day {
  display: flex;
  flex-direction: column;

  .racing-wrapper {
    display: flex;
    margin-bottom: 20px;
    gap: 20px;

    .race-board-section {
      flex: 1;
    }

    .information-section {
      padding: 24px;
      display: flex;
      align-items: center;
    }
  }
}
</style>

<style lang="scss">
html {
  background-color: #f9f9f9;
}
</style>
