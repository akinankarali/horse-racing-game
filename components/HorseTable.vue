<template>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Condition</th>
        <th>Color</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="horse in allHorses" :key="horse.id">
        <td>{{ horse.title }}</td>
        <td>{{ horse.condition }}</td>
        <td>
          <div
            :style="{
              backgroundColor: horse.color,
              width: '20px',
              height: '20px',
            }"
          ></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';

export default {
  name: 'HorseTable',
  computed: {
    ...mapGetters({
      allHorses: 'allHorses',
    }),
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f6dcac;
}

th,
td {
  padding: 8px;
  border: 1px solid #ccc;
}

th {
  background-color: #feae6f;
}

div {
  display: inline-block;
}
</style>
