import { expertsStore } from '@src/infrastructure/prun-api/data/experts';
import { productionStore } from '@src/infrastructure/prun-api/data/production';
import { sitesStore } from '@src/infrastructure/prun-api/data/sites';
import { timestampEachMinute } from '@src/utils/dayjs';
import { formatEta } from '@src/utils/format';
import { createReactiveDiv } from '@src/utils/reactive-element';

const expertise = [
  'AGRICULTURE',
  'CHEMISTRY',
  'CONSTRUCTION',
  'ELECTRONICS',
  'FOOD_INDUSTRIES',
  'FUEL_REFINING',
  'MANUFACTURING',
  'METALLURGY',
  'RESOURCE_EXTRACTION',
];

const expertDays = [10.0, 12.5, 57.57, 276.5, 915.1];

function onTileReady(tile: PrunTile) {
  const site = sitesStore.getById(tile.parameter)!;

  let index = -2;
  subscribe($$(tile.anchor, 'tr'), tr => {
    if (index === -2) {
      const th = document.createElement('th');
      th.innerText = 'Expert ETA';
      tr.append(th);
      ++index;
      return;
    }
    const trIndex = ++index;
    onExpertRowReady(tr, trIndex, site.siteId);
  });
}

function onExpertRowReady(row: HTMLTableRowElement, index: number, siteId: string) {
  const expertField = computed(() => {
    const experts = expertsStore.all.value?.find(store => store.siteId === siteId);
    return experts?.experts.find(field => field.category === expertise[index]);
  });

  const prod = productionStore.getBySiteId(siteId);
  const expertOrders = computed(() => {
    const production = productionStore.all.value?.filter(store => store.siteId === siteId) ?? prod;
    const expertFieldLines = production?.filter(line =>
      line.efficiencyFactors.some(
        factor => factor.type === 'EXPERTS' && factor.expertiseCategory === expertise[index],
      ),
    );
    return expertFieldLines
      ?.flatMap(line => line.orders)
      .filter(order => order.completion)
      .sort((a, b) => a.completion!.timestamp - b.completion!.timestamp);
  });

  const completion = computed(() => {
    if (!expertField.value || expertField.value.entry.current === 5) {
      return undefined;
    }
    if (expertOrders.value && expertOrders.value.length > 0) {
      return calcNextExpertDate(expertOrders.value, expertField.value);
    }
    return undefined;
  });

  const text = computed(() => {
    if (!completion.value) {
      return `No production found.`;
    }
    return `(${formatEta(timestampEachMinute.value, timestampEachMinute.value + completion.value)})`;
  });

  const div = createReactiveDiv(row, text);
  const td = document.createElement('td');
  td.append(div);
  row.append(td);
}

function calcNextExpertDate(orders: PrunApi.ProductionOrder[], field: PrunApi.ExpertField) {
  const msToGo = (1 - field.entry.progress) * expertDays[field.entry.current] * 24 * 60 * 60 * 1000;
  let contributingOrdersTime = 0;
  for (const order of orders) {
    if (contributingOrdersTime > msToGo) {
      return order.completion!.timestamp;
    }
    contributingOrdersTime += order.duration!.millis;
  }
  return msToGo / orders.length;
}

function init() {
  tiles.observe('EXP', onTileReady);
}

features.add(import.meta.url, init, 'EXP: Display ETA for next expert to appear.');
