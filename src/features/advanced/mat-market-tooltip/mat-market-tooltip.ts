import classes from './mat-market-tooltip.module.css';
import { applyCssRule } from '@src/infrastructure/prun-ui/refined-prun-css';
import MarketTooltip from './MarketTooltip.vue';
import { reactive } from 'vue';
import { refTextContent } from '@src/utils/reactive-dom';
import { watchEffectWhileNodeAlive } from '@src/utils/watch';

export const store = reactive({
  exchanges: ['AI1', 'CI1', 'CI2', 'IC1', 'NC1', 'NC2'],
  selectedExchange: 'AI1',
  materialID: '',
  shipmentID: '',
  tooltipElement: undefined as HTMLElement | undefined,
  showTooltip() {
    this.getTooltipElement();
    (this.tooltipElement as HTMLElement).style.display = 'block';
  },
  hideTooltip() {
    this.getTooltipElement();
    (this.tooltipElement as HTMLElement).style.display = 'none';
  },
  getTooltipElement() {
    if (this.tooltipElement) {
      return;
    }
    const element = document.getElementById('mat_market_tooltip');
    if (element) {
      this.tooltipElement = element as HTMLElement;
    }
  },
});

function init() {
  applyCssRule(
    `.${C.ColoredIcon.labelContainer} > .${C.ColoredIcon.label}`,
    classes.noPointerEvents,
  );

  subscribe($$(document, C.ColoredIcon.label), label => {
    const container = label.closest(`.${C.ColoredIcon.container}`) as HTMLElement;
    if (!container) {
      return;
    }
    const ticker = refTextContent(label);
    watchEffectWhileNodeAlive(label, () => {
      if (!ticker.value) {
        return;
      }
      //TODO const material = materialsStore.getByTicker(ticker.value);
      applyMarketTooltip(container, ticker.value);
    });
  });

  // Make a div that we can use as our tooltip
  const container = document.getElementById('container');
  if (container?.parentElement) {
    createFragmentApp(MarketTooltip).appendTo(container as Node);
    store.getTooltipElement();
  }
}

function applyMarketTooltip(container: Element, ticker: string) {
  const tooltipDiv = store.tooltipElement;
  if (!tooltipDiv) {
    return;
  }

  /*
  //shipment doesn't need market details
  if (container.hasAttribute('title') && ticker == 'SHPT') {
    container.setAttribute(
      'mmtSHPT',
      container.getAttribute('title') || "Error, 'title' not found",
    );
    container.removeAttribute('title');
  }
  */

  //move tooltip to the container with a mouseenter event
  container.addEventListener('mouseenter', async () => {
    store.showTooltip();
    setTooltipMaterial(container, ticker);
    await nextTick();
    calcTooltipLocation(container, tooltipDiv, document.body);
  });

  container.addEventListener('mouseleave', () => {
    if (!tooltipDiv.matches(':hover')) {
      store.hideTooltip();
    }
  });
  //remove title just so the default browser tooltip doesn't show
  if (container.hasAttribute('title')) {
    container.removeAttribute('title');
  }
}

function setTooltipMaterial(container, material: string): void {
  //shipment doesn't need market details
  if (material == 'SHPT') {
    store.shipmentID = container.getAttribute('mmt_shpt_info') || '';
    store.materialID = '';
    return;
  }
  store.materialID = material;
  store.shipmentID = '';
}

function calcTooltipLocation(container, tooltipDiv, documentBody) {
  const containerRect = container.getBoundingClientRect();
  //calculate how many pixels into the coloredIcon container is 5% in to ensure the tooltip overlaps on it a little
  //If there is no overlap, sometimes there is a decimal pixel gap between the container and tooltip
  const fivePercentContainer = containerRect.width * 0.05 > 2 ? containerRect.width * 0.05 : 2;

  //basic right-hand edge detection only
  const tooltipRect = tooltipDiv.getBoundingClientRect();
  const documentRect = documentBody.getBoundingClientRect();
  let left = '';
  if (tooltipRect.width + containerRect.right - fivePercentContainer > documentRect.right) {
    left = (containerRect.left - tooltipRect.width + fivePercentContainer).toString() + 'px';
  } else {
    left = (containerRect.right - fivePercentContainer).toString() + 'px';
  }
  const containerMidHeight = (containerRect.top + containerRect.bottom) / 2;
  const top = (containerMidHeight - tooltipRect.height / 2).toString() + 'px';

  tooltipDiv.style.left = left;
  tooltipDiv.style.top = top;
}

features.add(
  import.meta.url,
  init,
  'Mat: Hover over any material to quickly see material market buttons.',
);
