<script setup lang="ts">
import { store } from './mat-market-tooltip';
import LoadingSpinner from '@src/components/LoadingSpinner.vue';

const columns = ['Ask', 'Amt', 'Bid', 'Amt', 'Supply', 'Demand'];
const exchanges = ['AI1', 'CI1', 'CI2', 'IC1', 'NC1', 'NC2'];
const loading = {};
for (const exchange of exchanges) {
  loading[exchange] = ref(true);
}
const hasAnyData = ref(false);
</script>

<template>
  <div v-if="!store.showTooltip"> No data available to show </div>
  <table id="mat_market_tooltip_table_ID" v-if="store.showTooltip">
    <tbody id="mat_market_tooltip_table_body_ID">
      <tr>
        <td id="mmt_material_ID">{{ store.materialID }}</td>
        <td v-for="column in columns">{{ column }}</td>
      </tr>
      <tr v-for="exchange in Object.keys(store['marketData'])" :id="'mmt_' + exchange">
        <template v-if="store['marketData'][exchange]">
          <td>{{ exchange }}</td>
          <td v-for="exchangeInfo in store['marketData'][exchange]">
            {{ exchangeInfo }}
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>
<style module>
.loading {
  width: fit-content;
  height: fit-content;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
