<script setup lang="ts">
import { materialsStore } from '@src/infrastructure/prun-api/data/materials';
import GridMaterialIcon from '@src/components/GridMaterialIcon.vue';
import { useXitParameters } from '@src/hooks/use-xit-parameters';
import { materialCategoriesStore } from '@src/infrastructure/prun-api/data/material-categories';
import { isEmpty } from 'ts-extras';
import { sortMaterials } from '@src/core/sort-materials';

const parameters = useXitParameters();
const materials = computed(() => {
  if (isEmpty(parameters)) {
    return materialsStore.all.value;
  }

  const materials: PrunApi.Material[] = [];
  let combo = '';
  for (const parameter of parameters) {
    const material = materialsStore.getByTicker(parameter);
    if (material) {
      materials.push(material);
      combo = '';
      continue;
    }

    let category: PrunApi.MaterialCategory | undefined = undefined;
    if (combo) {
      combo += ' ' + parameter;
    } else {
      combo = parameter;
    }

    category = materialCategoriesStore.getBySerializableName(combo);
    if (category) {
      materials.push(...category.materials);
      combo = '';
    }
  }

  return materials;
});

const sorted = computed(() => sortMaterials(materials.value ?? []));
</script>

<template>
  <div :class="C.InventoryView.grid">
    <GridMaterialIcon v-for="mat in sorted" :key="mat.id" :ticker="mat.ticker" />
  </div>
</template>
