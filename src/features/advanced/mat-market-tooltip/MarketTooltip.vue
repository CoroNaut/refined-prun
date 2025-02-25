<script setup lang="ts">
import { store } from './mat-market-tooltip';
import PrunButton from '@src/components/PrunButton.vue';
import SelectInput from '@src/components/forms/SelectInput.vue';

const exchanges = ['AI1', 'CI1', 'IC1', 'NC1', 'CI2', 'NC2'];
</script>

<template>
  <div id="mat_market_tooltip" :class="$style.tooltip" @mouseleave="store.hideTooltip">
    <div v-if="store.shipmentID.length">{{ store.shipmentID }}</div>
    <div v-if="!store.shipmentID.length && store.materialID.length">
      <div>
        <SelectInput
          :options="exchanges"
          v-model="store.selectedExchange"
          :class="[C.forms.input, $style.select, 'select']">
        </SelectInput>
      </div>
      <div>
        <PrunButton
          :dark="true"
          :inline="true"
          :class="$style.prunButton"
          @click="store.showBuffer('CXP')">
          Info
        </PrunButton>
        <PrunButton
          :dark="true"
          :inline="true"
          :class="$style.prunButton"
          @click="store.showBuffer('CXPC')">
          Chart
        </PrunButton>
        <PrunButton
          :dark="true"
          :inline="true"
          :class="$style.prunButton"
          @click="store.showBuffer('CXOB')">
          Orders
        </PrunButton>
        <PrunButton
          :dark="true"
          :inline="true"
          :class="$style.prunButton"
          @click="store.showBuffer('CXPO')">
          Trade
        </PrunButton>
        <PrunButton
          :dark="true"
          :inline="true"
          :class="$style.prunButton"
          @click="store.showBuffer('CXM')">
          CXM
        </PrunButton>
      </div>
    </div>
  </div>
</template>
<style module>
.prunButton {
  display: block;
  margin-bottom: 0;
  margin-left: 0 !important;
  width: 100%;
}

.select {
  width: 2.9em;
}

.tooltip {
  background: rgb(38, 38, 38);
  border: 2px solid rgb(196, 132, 0);
  border-radius: 4px;
  color: rgb(238, 238, 238);
  position: absolute;
  z-index: 99998;
}
</style>
