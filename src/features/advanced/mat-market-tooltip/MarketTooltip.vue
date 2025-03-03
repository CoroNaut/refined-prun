<script setup lang="ts">
import PrunButton from '@src/components/PrunButton.vue';
import SelectInput from '@src/components/forms/SelectInput.vue';
import { store } from './mat-market-tooltip';

const exchanges: string[] = ['AI1', 'CI1', 'IC1', 'NC1', 'CI2', 'NC2'];
const buttons: [string, string][] = [
  ['Info', 'CXP'],
  ['Chart', 'CXPC'],
  ['Orders', 'CXOB'],
  ['Trade', 'CXPO'],
  ['CXM', 'CXM'],
];
//@mouseleave="store.hideTooltip"
</script>

<template>
  <div id="mat_market_tooltip" :class="$style.tooltip" :style="store.tooltipStyle">
    <div v-if="store.materialID">
      <div>
        <SelectInput
          :options="exchanges"
          v-model="store.selectedExchange"
          :class="[C.forms.input, $style.select, 'select']">
        </SelectInput>
      </div>
      <div>
        <PrunButton
          v-for="cmd in buttons"
          :key="cmd[1]"
          :dark="true"
          :inline="true"
          :class="$style.prunButton"
          @click="store.showBuffer(cmd[1])">
          {{ cmd[0] }}
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
