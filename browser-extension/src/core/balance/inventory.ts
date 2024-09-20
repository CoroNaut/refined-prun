import { computed } from 'vue';
import { storagesStore } from '@src/infrastructure/prun-api/data/storage';
import { getStoreLocationName, sumMapValues } from '@src/core/balance/utils';
import { shipyardProjectsStore } from '@src/infrastructure/prun-api/data/shipyard-projects';
import { shipyardsStore } from '@src/infrastructure/prun-api/data/shipyards';
import { getEntityNameFromAddress } from '@src/infrastructure/prun-api/data/addresses';
import { sumMaterialAmountPrice } from '@src/infrastructure/fio/cx';

type LocationName = string;

const byLocation = computed(() => {
  const storages = storagesStore.all.value;
  const projects = shipyardProjectsStore.all.value;
  if (storages === undefined || projects === undefined) {
    return undefined;
  }
  const inventories = new Map<LocationName, number>();
  for (const store of storages) {
    const items = store.items.map(x => x.quantity!).filter(x => !!x);
    const value = sumMaterialAmountPrice(items);
    if (value === undefined) {
      return undefined;
    }

    const name = getStoreLocationName(store);
    inventories.set(name, (inventories.get(name) ?? 0) + value);
  }
  for (const project of projects.filter(x => x.status === 'CREATED')) {
    const value = sumMaterialAmountPrice(project.inventory.items);
    if (value === undefined) {
      return undefined;
    }

    const shipyard = shipyardsStore.getById(project.shipyardId);
    if (!shipyard) {
      continue;
    }

    const name = getEntityNameFromAddress(shipyard.address)!;
    inventories.set(name, (inventories.get(name) ?? 0) + value);
  }
  return inventories;
});

const total = computed(() => sumMapValues(byLocation.value));

export const inventory = {
  byLocation,
  total,
};
