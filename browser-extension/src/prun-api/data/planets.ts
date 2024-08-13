import { createEntityStore } from '@src/prun-api/data/create-entity-store';
import { messages } from '@src/prun-api/data/api-messages';

interface Planet {
  naturalId: string;
  name: string;
}

const store = createEntityStore<Planet>();
const state = store.state;

messages({
  FIO_PLANET_DATA(data: { planets: Planet[] }) {
    store.setAll(data.planets);
    store.setFetched();
  },
});

export const planetsStore = {
  ...state,
};
