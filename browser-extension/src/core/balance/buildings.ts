import { sumMaterialAmountPrice } from '@src/infrastructure/fio/cx';
import { getBuildingLastRepair, sitesStore } from '@src/infrastructure/prun-api/data/sites';
import { sumMapValues } from '@src/core/balance/utils';
import { getEntityNameFromAddress } from '@src/infrastructure/prun-api/data/addresses';
import { timestampEachMinute } from '@src/utils/dayjs';
import { calculateBuildingCondition } from '@src/core/buildings';
import { computed } from 'vue';
import { diffDays } from '@src/utils/time-diff';
import { sum } from '@src/utils/sum';
import { sumBy } from '@src/utils/sum-by';

interface Entry {
  location: string;
  building: PrunApi.Platform;
  value: number;
}

const buildingsMarketValue = computed(() => {
  const sites = sitesStore.all.value;
  if (sites === undefined) {
    return undefined;
  }
  const buildings: Entry[] = [];
  for (const site of sites) {
    const location = getEntityNameFromAddress(site.address)!;
    for (const building of site.platforms) {
      const value = sum(
        sumMaterialAmountPrice(building.reclaimableMaterials),
        sumMaterialAmountPrice(building.repairMaterials),
      );
      if (value === undefined) {
        return undefined;
      }
      buildings.push({
        location,
        building,
        value,
      });
    }
  }
  return buildings;
});

const accumulatedDepreciationByBuilding = computed(() => {
  if (!buildingsMarketValue.value) {
    return undefined;
  }

  const now = timestampEachMinute.value;
  const buildings = new Map<string, number>();
  for (const building of buildingsMarketValue.value) {
    const lastRepair = getBuildingLastRepair(building.building);
    const age = diffDays(lastRepair, now, true);
    const value = building.value * (1 - calculateBuildingCondition(age));
    buildings.set(building.building.id, value);
  }
  return buildings;
});

export const buildingsNetValueByLocation = computed(() => {
  if (!buildingsMarketValue.value || !accumulatedDepreciationByBuilding.value) {
    return undefined;
  }

  const buildings = new Map<string, number>();
  for (const building of buildingsMarketValue.value) {
    const depreciation = accumulatedDepreciationByBuilding.value.get(building.building.id);
    if (depreciation === undefined) {
      return undefined;
    }
    const value = building.value - depreciation;
    buildings.set(building.location, (buildings.get(building.location) ?? 0) + value);
  }
  return buildings;
});

export const buildings = {
  marketValue: computed(() => sumBy(buildingsMarketValue.value, x => x.value)),
  infrastructure: computed(() => sumBuildingsMarketValueByType(['CORE', 'STORAGE', 'HABITATION'])),
  resourceExtraction: computed(() => sumBuildingsMarketValueByType(['RESOURCES'])),
  production: computed(() => sumBuildingsMarketValueByType(['PRODUCTION'])),
  accumulatedDepreciation: computed(() => sumMapValues(accumulatedDepreciationByBuilding.value)),
};

function sumBuildingsMarketValueByType(types: PrunApi.PlatformModuleType[]) {
  if (!buildingsMarketValue.value) {
    return undefined;
  }

  let sum = 0;
  for (const type of types) {
    const buildingsByType = buildingsMarketValue.value.filter(x => x.building.module.type === type);
    for (const entry of buildingsByType) {
      sum += entry.value;
    }
  }
  return sum;
}
