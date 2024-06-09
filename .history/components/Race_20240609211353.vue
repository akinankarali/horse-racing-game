<template>
  <div class="race">
    <div class="race-buttons">
      <Button
        title="Generate Race Schedule"
        @action="generateRaceScheduleMethod"
      />
      <Button title="Start Race" @action="startRace" :disabled="isDisabled" />
    </div>
    <div class="horse-list">
      <HorseTable />
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import HorseTable from './HorseTable.vue';
import Button from '../components/Button.vue';

export default {
  components: {
    HorseTable,
    Button,
  },
  data() {
    return {
      isDisabled: true,
    };
  },
  computed: {
    ...mapGetters({
      allHorses: 'allHorses',
      raceResults: 'raceResults',
      selectedHorses: 'selectedHorses',
    }),
  },
  methods: {
    ...mapActions({
      generateHorses: 'generateHorses',
      generateRaceSchedule: 'generateRaceSchedule',
      startRace: 'startRace',
    }),

    generateRaceScheduleMethod() {
      this.isDisabled = false;
      this.generateRaceSchedule();
    },
  },
  mounted() {
    this.generateHorses();
  },
};
</script>

<style scoped lang="scss">
.horse-list {
  max-width: 300px;
  max-height: 400px;
  height: 100%;
  overflow: scroll;
}
.race-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
</style>
