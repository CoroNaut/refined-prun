import { createEntityStore } from '@src/infrastructure/prun-api/data/create-entity-store';
import { onApiMessage } from '@src/infrastructure/prun-api/data/api-messages';
import { createMapGetter } from '@src/infrastructure/prun-api/data/create-map-getter';
import { createId } from '@src/store/create-id';

const store = createEntityStore<PrunApi.Experts>();
const state = store.state;

onApiMessage({
  EXPERTS_EXPERTS(data: PrunApi.Experts) {
    data['id'] = createId();
    store.setOne(data);
    store.setFetched();
  },
});

const bySiteId = createMapGetter(state.all, x => x.siteId);

const getBySiteId = (value?: string | null) => {
  const result = bySiteId(value);
  if (result) {
    return result;
  }

  if (!value) {
    return undefined;
  }
  return undefined;
};

export const expertsStore = {
  ...state,
  getBySiteId,
};
