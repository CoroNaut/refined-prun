<script setup lang="ts">
import { store } from './mat-market-tooltip';
import { showBuffer } from '@src/infrastructure/prun-ui/buffers';
</script>

<template>
  <div id="mat_market_tooltip" :class="$style.mat_market_tooltip" @mouseleave="store.hideTooltip">
    <div v-if="store.shipmentID.length">{{ store.shipmentID }}</div>
    <table
      id="mat_market_tooltip_table"
      v-if="!store.shipmentID.length && store.materialID.length"
      :class="$style.tableRemoveBorder">
      <tbody id="mat_market_tooltip_table_body">
        <tr>
          <div :class="C.ActionBar.element">
            <select
              id="mmt_exchange_dropdown"
              :text="store.selectedExchange"
              :class="[C.forms.input, 'select', $style.slimdropdown]">
              <option
                v-for="exchange in store.exchanges"
                :key="exchange"
                @click="store.selectedExchange = exchange">
                {{ exchange }}
              </option>
            </select>
          </div>
        </tr>
        <tr
          ><Button
            id="mmt_material_button_info"
            :class="[
              C.Button.darkInline,
              C.Button.dark,
              C.Button.btn,
              C.Button.inline,
              $style.fillwidth,
            ]"
            @click="
              store.hideTooltip();
              showBuffer(`CXP ${store.materialID}.${store.selectedExchange}`);
            "
            >Info</Button
          ></tr
        >
        <tr
          ><Button
            id="mmt_material_button_chart"
            :class="[
              C.Button.darkInline,
              C.Button.dark,
              C.Button.btn,
              C.Button.inline,
              $style.fillwidth,
            ]"
            @click="
              store.hideTooltip();
              showBuffer(`CXPC ${store.materialID}.${store.selectedExchange}`);
            "
            >Chart</Button
          ></tr
        >
        <tr
          ><Button
            id="mmt_material_button_orders"
            :class="[
              C.Button.darkInline,
              C.Button.dark,
              C.Button.btn,
              C.Button.inline,
              $style.fillwidth,
            ]"
            @click="
              store.hideTooltip();
              showBuffer(`CXOB ${store.materialID}.${store.selectedExchange}`);
            "
            >Orders</Button
          ></tr
        >
        <tr
          ><Button
            id="mmt_material_button_trade"
            :class="[
              C.Button.darkInline,
              C.Button.dark,
              C.Button.btn,
              C.Button.inline,
              $style.fillwidth,
            ]"
            @click="
              store.hideTooltip();
              showBuffer(`CXPO ${store.materialID}.${store.selectedExchange}`);
            "
            >Trade</Button
          ></tr
        >
        <tr
          ><Button
            id="mmt_material_button_cxm"
            :class="[
              C.Button.darkInline,
              C.Button.dark,
              C.Button.btn,
              C.Button.inline,
              $style.fillwidth,
            ]"
            @click="
              store.hideTooltip();
              showBuffer(`CXM ${store.materialID}`);
            "
            >CXM</Button
          ></tr
        >
      </tbody>
    </table>
  </div>
</template>
<style module>
.fillwidth {
  width: 100%;
}
.slimdropdown {
  padding-left: 0px;
  padding-right: 0px;
  margin-left: -3px;
  margin-right: -3px;
  margin-top: -1px;
  border-radius: 3px;
}
.tableRemoveBorder > tbody {
  border-bottom: none;
}
.mat_market_tooltip {
  align-items: center;
  background: rgb(38, 38, 38);
  border: 2px solid rgb(196, 132, 0);
  border-radius: 4px;
  border-style: solid;
  color: rgb(238, 238, 238);
  display: none;
  position: absolute;
  z-index: 99998;
}
.invisible_overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
  z-index: 99999;
}
</style>
