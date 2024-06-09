<template>
  <div class="race-board" v-if="selectedHorses[currentRound].length">
    <div
      v-for="horse in selectedHorses[currentRound]"
      :key="horse.id"
      class="horse"
      :style="{ transform: `translateX(${horse.position * 10}px)` }"
    >
      {{ horse.title }}
      <img
        class="horse-img"
        src="../assets/horse.svg"
        alt=""
        :style="{ filter: horse.filter }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';

export default {
  name: 'RaceBoard',
  computed: {
    ...mapGetters({
      selectedHorses: 'selectedHorses',
      currentRound: 'currentRound',
    }),
  },
};
</script>

<style scoped>
.race-board {
  width: 100%;
  height: 100%;
  max-height: 89%;
  border: 1px solid #ccc;
  overflow: hidden;
}

.horse-img {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  width: 24px;
  height: 24px;
}

.horse {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
  padding: 4px;
  position: relative;
}
</style>
