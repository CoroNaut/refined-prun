<script setup lang="ts">
import { planetsStore } from '@src/infrastructure/prun-api/data/planets';
import PrunButton from '@src/components/PrunButton.vue';
import SectionHeader from '@src/components/SectionHeader.vue';
import Active from '@src/components/forms/Active.vue';
import Commands from '@src/components/forms/Commands.vue';
import DateInput from '@src/components/forms/DateInput.vue';
import NumberInput from '@src/components/forms/NumberInput.vue';
import SelectInput from '@src/components/forms/SelectInput.vue';
import TextInput from '@src/components/forms/TextInput.vue';
import { isRepairableBuilding } from '@src/core/buildings';
import { getPlanetBurn } from '@src/core/burn';
import { mergeMaterialAmounts, sortMaterialAmounts } from '@src/core/sort-materials';
import {
  getEntityNameFromAddress,
  getEntityNaturalIdFromAddress,
} from '@src/infrastructure/prun-api/data/addresses';
import { getBuildingLastRepair, sitesStore } from '@src/infrastructure/prun-api/data/sites';
import { createId } from '@src/store/create-id';
import { fixed0 } from '@src/utils/format';
import { allBuildingCategories, allBuildingCosts } from './allbuildingmaterials';
import { build } from 'vite';
import { materialsStore } from '@src/infrastructure/prun-api/data/materials';
import TaskList from './TaskList.vue';
import RadioItem from '@src/components/forms/RadioItem.vue';

const { onDelete, onSave, task } = defineProps<{
  onDelete?: () => void;
  onSave?: () => void;
  task: UserData.Task;
}>();

const emit = defineEmits<{ (e: 'close'): void }>();

const types: UserData.TaskType[] = ['Text', 'Resupply', 'Repair', 'Building'];
const type = ref(task.type);

const text = ref(task.text);
const dueDate = ref(formatDateForInput(task.dueDate));
const recurring = ref(task.recurring);
const days = ref(task.days);
const buildingAge = ref(task.buildingAge);

function formatDateForInput(date: number | undefined) {
  if (!date) {
    return undefined;
  }
  const localDate = new Date(date);
  const year = localDate.getFullYear();
  // Month is 0-based
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const planets = computed(() => {
  if (!sitesStore.all) {
    return [];
  }

  return (sitesStore.all.value ?? []).map(x => ({
    label: getEntityNameFromAddress(x.address) || '',
    value: getEntityNaturalIdFromAddress(x.address) || '',
  }));
});

const buildingPlanet = ref(task.buildingPlanet ?? '');
const buildings = ref<Array<[string, string, number]>>(task.buildings ?? []);
const buildingAddAmt = ref(task.buildingAddAmt ?? 0);
const buildingCategory = ref(task.buildingCategory ?? 'Infrastructure');
const buildingEnvironmentMaterials = ref<string[]>(task.buildingEnvironmentMaterials ?? []);
const includeCM = ref(task.includeCM ?? false);

interface BuildingCost {
  Ticker: string;
  AreaCost: number;
  BuildingCosts: {
    CommodityTicker: string;
    Amount: number;
  }[];
}

const planet = ref(
  planets.value.find(x => x.value === task.planet)?.value ?? planets.value[0]?.value,
);

watchEffect(() => {
  // Preload resupply
  const site = sitesStore.getByPlanetNaturalId(planet.value);
  getPlanetBurn(site);
});

watchEffect(async () => {
  if (planetsStore.find(buildingPlanet.value)) {
    await fetch(`https://rest.fnar.net/planet/${buildingPlanet.value}`)
      .then(response => response.json())
      .then(planet => {
        getPlanetEnvironmentMaterials(planet);
      });
  } else {
    buildingEnvironmentMaterials.value = [];
  }
});

function getPlanetEnvironmentMaterials(planet: {
  Gravity: number;
  Pressure: number;
  Temperature: number;
  Surface: boolean;
}) {
  const materials: string[] = [];
  if (planet.Surface) {
    materials.push('MCG');
  } else {
    materials.push('AEF');
  }
  if (planet.Pressure < 0.25) {
    materials.push('SEA');
  } else if (planet.Pressure > 2.0) {
    materials.push('HSE');
  }
  if (planet.Gravity < 0.25) {
    materials.push('MGC');
  } else if (planet.Gravity > 2.5) {
    materials.push('BL');
  }
  if (planet.Temperature < -25) {
    materials.push('INS');
  } else if (planet.Temperature > 75) {
    materials.push('TSH');
  }
  buildingEnvironmentMaterials.value = materials;
}

async function onSaveClick() {
  task.type = type.value;
  if (dueDate.value) {
    const [year, month, day] = dueDate.value.split('-').map(x => parseInt(x, 10));
    // Month is 0-based
    const date = new Date(year, month - 1, day);
    task.dueDate = date.getTime();
  } else {
    delete task.dueDate;
  }
  task.recurring = recurring.value;
  delete task.text;
  delete task.planet;
  delete task.days;
  delete task.buildingAge;
  delete task.buildingPlanet;
  delete task.buildings;
  delete task.subtasks;
  if (type.value === 'Text') {
    task.text = text.value;
  }
  if (type.value === 'Resupply') {
    task.planet = planet.value;
    task.days = days.value || 7;
    const site = sitesStore.getByPlanetNaturalId(task.planet)!;
    task.text =
      `Supply [[p:${getEntityNameFromAddress(site.address)}]] with ` +
      `${task.days} ${task.days === 1 ? 'day' : 'days'} of consumables.`;

    const burn = getPlanetBurn(site)?.burn;
    if (burn) {
      task.subtasks = [];
      for (const mat of Object.keys(burn)) {
        const daily = burn[mat].DailyAmount;
        if (daily < 0) {
          task.subtasks.push({
            id: createId(),
            type: 'Text',
            text: `${fixed0(-daily * task.days)} [[m:${mat}]]`,
          });
        }
      }
    }
  }
  if (type.value === 'Repair') {
    task.planet = planet.value;
    task.buildingAge = buildingAge.value || 50;
    const site = sitesStore.getByPlanetNaturalId(task.planet)!;
    task.text =
      `Repair buildings on [[p:${getEntityNameFromAddress(site.address)}]] ` +
      `older than ${task.buildingAge} ${task.days === 1 ? 'day' : 'days'}`;

    let materials: PrunApi.MaterialAmount[] = [];

    task.subtasks = [];
    if (site?.platforms) {
      for (const building of site.platforms) {
        const shouldRepair =
          isRepairableBuilding(building) &&
          Date.now() - getBuildingLastRepair(building) > task.buildingAge * 86400000;
        if (!shouldRepair) {
          continue;
        }
        materials.push(...building.repairMaterials);
      }
    }

    materials = sortMaterialAmounts(mergeMaterialAmounts(materials));
    for (let amount of materials) {
      task.subtasks.push({
        id: createId(),
        type: 'Text',
        text: `${fixed0(amount.amount)} [[m:${amount.material.ticker}]]`,
      });
    }
  }
  if (type.value == 'Building') {
    if (buildingEnvironmentMaterials.value.length === 0 || buildingAddAmt.value === 0) {
      return;
    }

    task.buildingPlanet = buildingPlanet.value;
    task.buildings = buildings.value;
    task.buildingAddAmt = buildingAddAmt.value;
    task.buildingCategory = buildingCategory.value;
    task.buildingEnvironmentMaterials = buildingEnvironmentMaterials.value;
    task.includeCM = includeCM.value;

    let materials: PrunApi.MaterialAmount[] = [];
    let totalArea = 0;
    let totalBuildings = 0;
    let materialAEF = 0;

    if (includeCM.value) {
      if (buildings.value.findIndex(building => building[0] === 'CM') === -1) {
        buildings.value.push(['CM', 'CM', 1]);
      }
    } else {
      buildings.value = buildings.value.filter(building => building[0] !== 'CM');
    }

    for (const building of buildings.value) {
      const buildingCost = allBuildingCosts.find(
        buildingCost => buildingCost.Ticker === building[1],
      )!;
      totalArea += buildingCost.AreaCost * building[2];
      totalBuildings += building[2];
      materialAEF += Math.ceil(buildingCost.AreaCost / 3) * building[2];
      for (const constructionMaterial of buildingCost.BuildingCosts) {
        const material = materialsStore.getByTicker(constructionMaterial.CommodityTicker)!;
        materials.push({ material: material, amount: constructionMaterial.Amount * building[2] });
      }
    }

    for (const environmentMaterial of buildingEnvironmentMaterials.value) {
      let amount = 0;
      if (environmentMaterial === 'MCG') {
        amount = totalArea * 4;
      } else if (environmentMaterial === 'AEF') {
        amount = materialAEF;
      } else if (environmentMaterial === 'SEA') {
        amount = totalArea;
      } else if (environmentMaterial === 'HSE') {
        amount = totalBuildings;
      } else if (environmentMaterial === 'MGC') {
        amount = totalBuildings;
      } else if (environmentMaterial === 'BL') {
        amount = totalBuildings;
      } else if (environmentMaterial === 'INS') {
        amount = totalArea * 10;
      } else if (environmentMaterial === 'TSH') {
        amount = totalBuildings;
      }
      const material = materialsStore.getByTicker(environmentMaterial)!;
      materials.push({ material: material, amount: amount });
    }

    materials = sortMaterialAmounts(mergeMaterialAmounts(materials));

    let environmentMaterialsText = '';
    if (buildingEnvironmentMaterials.value.length > 0) {
      for (const material of buildingEnvironmentMaterials.value) {
        environmentMaterialsText += `, [[m:${material}]]`;
      }
      environmentMaterialsText = 'Environment Materials: ' + environmentMaterialsText.substring(2);
    }

    task.text = `Construct ${totalBuildings} buildings at [[p:${buildingPlanet.value.toUpperCase()}]]. 
      Area: ${totalArea}. ${environmentMaterialsText}`;

    task.subtasks = [];
    for (const material of materials) {
      task.subtasks.push({
        id: createId(),
        type: 'Text',
        text: `${material.amount} [[m:${material.material.ticker}]]`,
      });
    }
  }
  onSave?.();
  emit('close');
}

function onDeleteClick() {
  onDelete?.();
  emit('close');
}

function addBuilding() {
  buildingAddAmt.value++;
  buildings.value.push([
    buildingCategory.value,
    allBuildingCategories[buildingCategory.value][0],
    1,
  ]);
}

function remBuilding() {
  buildingAddAmt.value--;
  buildings.value.pop();
}
const $style = useCssModule();

const validPlanet = computed(() => {
  if (buildingEnvironmentMaterials.value.length === 0) {
    return $style.invalidPlanet;
  } else {
    return $style.validPlanet;
  }
});
</script>

<template>
  <div :class="C.DraftConditionEditor.form">
    <SectionHeader>Edit task</SectionHeader>
    <form>
      <Active label="Type">
        <SelectInput v-model="type" :options="types" />
      </Active>
      <Active label="Due Date">
        <DateInput v-model="dueDate" />
      </Active>
      <Active
        v-if="type !== 'Building'"
        label="Recurring period"
        tooltip="An amount of days the due date will advance on task completion.">
        <NumberInput v-model="recurring" />
      </Active>
      <template v-if="type === 'Text'">
        <Active label="Text">
          <TextInput v-model="text" />
        </Active>
      </template>
      <template v-if="type === 'Resupply'">
        <Active label="Planet">
          <SelectInput v-model="planet" :options="planets" />
        </Active>
        <Active label="Days" tooltip="The number of days of supplies.">
          <NumberInput v-model="days" />
        </Active>
      </template>
      <template v-if="type === 'Repair'">
        <Active label="Planet">
          <SelectInput v-model="planet" :options="planets" />
        </Active>
        <Active label="Building age" tooltip="The minimum building age to be included in the list.">
          <NumberInput v-model="buildingAge" />
        </Active>
      </template>
      <template v-if="type === 'Building'">
        <Active label="Core Module">
          <RadioItem v-model="includeCM">
            <div>Include</div>
          </RadioItem>
        </Active>
        <Active label="Planet">
          <TextInput v-model="buildingPlanet" />
        </Active>
        <Commands label="Planet materials">
          <div :class="[$style.buildingPlanetMaterials, validPlanet]">{{
            buildingEnvironmentMaterials
          }}</div>
        </Commands>
        <template v-for="building in buildings">
          <template v-if="building[0] !== 'CM'">
            <Active label="Building">
              <div :class="$style.selectInputBuildingOption">
                <span :class="$style.selectInputBuilding">{{ building[0] }}: </span>
                <SelectInput
                  :class="$style.selectInputBuilding"
                  v-model="building[1]"
                  :options="allBuildingCategories[building[0]]" />
              </div>
            </Active>
            <Active label="Amount" tooltip="Amount of the selected building">
              <NumberInput v-model="building[2]" />
            </Active>
          </template>
        </template>
        <Active label="Building Category">
          <SelectInput v-model="buildingCategory" :options="Object.keys(allBuildingCategories)" />
        </Active>
        <Commands>
          <PrunButton v-if="type === 'Building'" primary @click="addBuilding">ADD</PrunButton>
          <PrunButton v-if="type === 'Building' && buildingAddAmt > 0" primary @click="remBuilding"
            >REMOVE</PrunButton
          >
        </Commands>
      </template>
      <Commands>
        <PrunButton primary @click="onSaveClick">SAVE</PrunButton>
        <PrunButton v-if="onDelete" danger @click="onDeleteClick">DELETE</PrunButton>
      </Commands>
    </form>
  </div>
</template>

<style module>
.buildingPlanetMaterials {
  width: 158px;
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
}

.validPlanet {
  background-color: rgba(92, 184, 92, 0.175);
}

.invalidPlanet {
  background-color: rgba(217, 83, 79, 0.3);
}

.selectInputBuildingOption {
  display: flex;
}

.selectInputBuilding {
  width: 79px;
}
</style>
