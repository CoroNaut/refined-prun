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

const buildingCategoriesLabels = {
  Infrastructure: ['HB1', 'HB2', 'HB3', 'HB4', 'HB5', 'HBB', 'HBC', 'HBL', 'HBM', 'STO'],
  Resources: ['COL', 'EXT', 'RIG'],
  Pioneers: ['BMP', 'FRM', 'FP', 'INC', 'PP1', 'SME', 'WEL'],
  Settlers: [
    'CHP',
    'CLF',
    'EDM',
    'FER',
    'FS',
    'GF',
    'HYF',
    'PPF',
    'POL',
    'PP2',
    'REF',
    'UPF',
    'WPL',
  ],
  Technicians: [
    'CLR',
    'ELP',
    'ECA',
    'HWP',
    'IVP',
    'LAB',
    'MCA',
    'ORC',
    'PHF',
    'PP3',
    'SKF',
    'SCA',
    'SD',
    'TMP',
  ],
  Engineers: ['AML', 'ASM', 'APF', 'DRS', 'PP4', 'SE', 'SPP'],
  Scientists: ['AAF', 'EEP', 'SL', 'SPF'],
};

const buildingPlanet = ref('');
const buildingPlanetMaterials = ref('');
const buildingCategory = ref('Infrastructure');
const buildingAddAmt = ref(1);
const buildings = ref<Array<[string, number]>>([
  [buildingCategoriesLabels[buildingCategory.value][0], 1],
]);

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
    buildingPlanetMaterials.value = '';
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
  buildingPlanetMaterials.value = materials.join(', ');
}

function onSaveClick() {
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
    task.buildings = buildings.value;
    task.buildingPlanet = buildingPlanet.value;

    buildingPlanetMaterials;

    //get the planet Info
    //fetch(`https://rest.fnar.net/`)
    //.then(response => response.json())
    // .then(data => {
    // });

    let materials: PrunApi.MaterialAmount[] = [];
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
  buildings.value.push(['', 1]);
}

function remBuilding() {
  buildingAddAmt.value--;
  buildings.value.pop();
}
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
        <Active label="Planet">
          <TextInput v-model="buildingPlanet" />
        </Active>
        <Commands label="Planet materials">
          <div :class="$style.buildingPlanetMaterials">{{ buildingPlanetMaterials }}</div>
        </Commands>
        <Active label="Building Category">
          <SelectInput
            v-model="buildingCategory"
            :options="Object.keys(buildingCategoriesLabels)" />
        </Active>
        <template v-for="building in buildings">
          <Active label="Building">
            <SelectInput
              v-model="building[0]"
              :options="buildingCategoriesLabels[buildingCategory]" />
          </Active>
          <Active label="Amount" tooltip="Amount of the selected building">
            <NumberInput v-model="building[1]" />
          </Active>
        </template>
        <Commands>
          <PrunButton v-if="type === 'Building'" primary @click="addBuilding">ADD</PrunButton>
          <PrunButton v-if="type === 'Building' && buildingAddAmt > 1" primary @click="remBuilding"
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
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
}
</style>
