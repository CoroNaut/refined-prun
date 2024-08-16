import { createEntityStore } from '@src/prun-api/data/create-entity-store';
import { messages } from '@src/prun-api/data/api-messages';
import { createMapGetter } from '@src/prun-api/data/create-map-getter';

const store = createEntityStore<PrunApi.Contract>();
const state = store.state;

messages({
  CONTRACTS_CONTRACTS(data: { contracts: PrunApi.Contract[] }) {
    store.setAll(data.contracts);
    store.setFetched();
  },
  CONTRACTS_CONTRACT(data: PrunApi.Contract) {
    store.setOne(data);
  },
});

const getByLocalId = createMapGetter(
  state.all,
  x => x.localId.toUpperCase(),
  x => x.toUpperCase(),
);

function getByShipmentId(id?: string | undefined) {
  if (!id) {
    return undefined;
  }

  for (const contract of state.all.value) {
    const condition = contract.conditions.find(
      x => x.type === 'DELIVERY_SHIPMENT' && x.shipmentItemId?.startsWith(id),
    );
    if (condition) {
      return contract;
    }
  }

  return undefined;
}

function getDeliveryConditionByShipmentId(id?: string | undefined) {
  if (!id) {
    return undefined;
  }

  for (const contract of state.all.value) {
    const condition = contract.conditions.find(
      x =>
        x.type === 'DELIVERY_SHIPMENT' &&
        x.shipmentItemId?.toLowerCase().startsWith(id.toLowerCase()),
    );
    if (condition) {
      return condition;
    }
  }

  return undefined;
}

function getDestinationByShipmentId(id?: string | undefined) {
  const deliveryCondition = getDeliveryConditionByShipmentId(id);
  const destination = deliveryCondition?.destination?.lines[1];
  if (!destination) {
    return undefined;
  }

  return destination.type === 'PLANET' ? destination.entity.name : destination.entity.naturalId;
}

export const contractsStore = {
  ...state,
  getByLocalId,
  getByShipmentId,
  getDestinationByShipmentId,
};
