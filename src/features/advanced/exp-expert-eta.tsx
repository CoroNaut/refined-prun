import Tooltip from '@src/components/Tooltip.vue';
import { expertsStore } from '@src/infrastructure/prun-api/data/experts';
import { productionStore } from '@src/infrastructure/prun-api/data/production';
import { request } from '@src/infrastructure/prun-api/data/request-hooks';
import { sitesStore } from '@src/infrastructure/prun-api/data/sites';
import { timestampEachMinute } from '@src/utils/dayjs';
import { formatEta } from '@src/utils/format';
import { createReactiveDiv } from '@src/utils/reactive-element';
import $style from './exp-expert-eta.module.css';

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

  let index = 0;
  subscribe($$(tile.anchor, 'tr'), tr => {
    if (_$(tr, 'th')) {
      createFragmentApp(() => (
        <th>
          Expert Eta
          <Tooltip
            class={$style.tooltip}
            position="left"
            tooltip="ETA will be exact if you will get a new expert with your current orders, and approximate if your current orders are not enough."
          />
        </th>
      )).appendTo(tr);
      return;
    }
    onExpertRowReady(tr, index++, site.siteId);
  });
}

function onExpertRowReady(row: HTMLTableRowElement, index: number, siteId: string) {
  const expertField = computed(() => {
    const experts = expertsStore.all.value?.find(store => store.siteId === siteId);
    return experts?.experts.find(field => field.category === expertise[index]);
  });

  request.production(siteId);
  const expertOrders = computed(() => {
    const production = productionStore.all.value?.filter(store => store.siteId === siteId);
    const expertFieldLines = production?.filter(line =>
      line.efficiencyFactors.some(
        factor => factor.type === 'EXPERTS' && factor.expertiseCategory === expertise[index],
      ),
    );
    // Combine all production orders from all lines that contribute to this expert field.
    // Sort them by ascending completion time if ongoing, and by ascending creation time if queued.
    return expertFieldLines
      ?.flatMap(line => line.orders)
      .sort((a, b) => {
        if (!a.completion && !b.completion) {
          return a.created.timestamp - b.created.timestamp;
        }
        if (!a.completion) {
          return 1;
        }
        if (!b.completion) {
          return -1;
        }
        return a.completion!.timestamp - b.completion!.timestamp;
      });
  });

  const completion = computed(() => {
    console.log('completion');
    if (!expertField.value) {
      return undefined;
    }
    if (expertField.value.entry.current === 5) {
      return [-1];
    }
    const orders = expertOrders.value;
    console.log(orders);
    if (orders && orders.length > 0) {
      const entry = expertField.value.entry;
      const msToGo = (1 - entry.progress) * expertDays[entry.current] * 86400000;

      // Get completion time and duration for all orders, including queued ones.
      const completions: [number, number][] = [];
      let contributingOrdersTime = 0;
      for (const order of orders) {
        const duration = order.duration!.millis;
        console.log(msToGo - contributingOrdersTime - duration);
        if ((contributingOrdersTime += duration) > msToGo) {
          if (order.completion) {
            return [-2, order.completion.timestamp];
          }
          return [-2, completions[0][0]];
        }
        if (order.completion) {
          completions.push([order.completion.timestamp, duration]);
        } else {
          completions.push([completions.shift()![0] + duration, duration]);
          completions.sort((a, b) => a[0] - b[0]);
        }
      }
      console.log(completions);

      // All ongoing and queued orders completed, but we still need more for a new expert.
      return [
        -3,
        completions[completions.length - 1][0] + (msToGo - contributingOrdersTime) / orders.length,
      ];
    }
    return undefined;
  });

  const text = computed(() => {
    console.log('text');
    if (!completion.value) {
      return 'No production found.';
    } else if (completion.value[0] === -1) {
      return 'Expert field Maxed.';
    } else if (completion.value[0] === -2) {
      return `(${formatEta(timestampEachMinute.value, completion.value[1])})`;
    } else if (completion.value[0] === -3) {
      return `Approximately (${formatEta(timestampEachMinute.value, completion.value[1])})`;
    }
    return `DON'T LOOK! I'M A BUG!`;
  });

  const div = createReactiveDiv(row, text);
  const td = document.createElement('td');
  td.append(div);
  row.append(td);
}

function init() {
  tiles.observe('EXP', onTileReady);
}

features.add(import.meta.url, init, 'EXP: Display ETA for next expert to appear.');
