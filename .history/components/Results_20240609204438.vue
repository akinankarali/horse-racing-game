<template>
  <div>
    <h3>Race Results</h3>
    <div v-for="(race, index) in raceResults" :key="index">
      <table v-if="race.winnerResult">
        <thead>
          <tr>
            <th>Winners</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ race.winnerResult }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['raceResults']),
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
