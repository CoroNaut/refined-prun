import { createEntityStore } from '@src/infrastructure/prun-api/data/create-entity-store';
import { onApiMessage } from '@src/infrastructure/prun-api/data/api-messages';
import { createMapGetter } from '@src/infrastructure/prun-api/data/create-map-getter';
import { Subject } from 'rxjs';

const store = createEntityStore<PrunApi.CXBroker>();
const state = store.state;

// Create a subject to emit updates
const storeUpdateSubject = new Subject<void>();

onApiMessage({
  COMEX_BROKER_DATA(data: PrunApi.CXBroker) {
    store.setOne(data);
    store.setFetched();
    // Emit an update event
    storeUpdateSubject.next();
  },
});

const getByTicker = createMapGetter(state.all, x => x.ticker);

export const cxobStore = {
  ...state,
  getByTicker,
  updates: storeUpdateSubject.asObservable(), // Expose the updates as an observable
};
