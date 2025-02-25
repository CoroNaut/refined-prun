import classes from './mat-market-tooltip.module.css';
import { applyCssRule } from '@src/infrastructure/prun-ui/refined-prun-css';
import MarketTooltip from './MarketTooltip.vue';
import { reactive } from 'vue';
import { refTextContent } from '@src/utils/reactive-dom';
import { watchEffectWhileNodeAlive } from '@src/utils/watch';
import { showBuffer } from '@src/infrastructure/prun-ui/buffers';

export const store = reactive({
  selectedExchange: 'AI1',
  materialID: '',
  shipmentID: '',
  tooltipElement: undefined as HTMLElement | undefined,
  showTooltip() {
    this.tooltipElement!.style.display = 'block';
  },
  hideTooltip() {
    this.tooltipElement!.style.display = 'none';
  },
  showBuffer(cmd: string) {
    this.hideTooltip(); //devs wanted it to be manual for every new buffer opened
    if (cmd === 'CXM') {
      return showBuffer(`CXM ${this.materialID}`);
    } else if (['CXP', 'CXPC', 'CXPO', 'CXOB'].includes(cmd)) {
      return showBuffer(`${cmd} ${this.materialID}.${this.selectedExchange}`);
    }
    return;
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
  applyCssRule(`.${C.ColoredIcon.labelContainer} > .${C.ColoredIcon.label}`, classes.coloredIcon);

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
  //TDOD needed?
  if (container.hasAttribute('title') && ticker == 'SHPT') {
    container.setAttribute(
      'mmtSHPT',
      container.getAttribute('title') || "Error, 'title' not found",
    );
    container.removeAttribute('title');
  }
  */

  container.addEventListener('mouseenter', async () => {
    store.showTooltip();
    setTooltipMaterial(container, ticker); //TODO needed?
    await nextTick();
    calcTooltipLocation(container, tooltipDiv, document.body);
  });

  container.addEventListener('mouseleave', () => {
    if (!tooltipDiv.matches(':hover')) {
      store.hideTooltip();
    }
  });

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

  //basic right-hand edge detection only
  const tooltipRect = tooltipDiv.getBoundingClientRect();

  const containerMidHeight = (containerRect.top + containerRect.bottom) / 2;
  tooltipDiv.style.top = (containerMidHeight - tooltipRect.height / 2).toString() + 'px';

  const documentRect = documentBody.getBoundingClientRect();
  if (tooltipRect.width + containerRect.right > documentRect.right) {
    tooltipDiv.style.left = (containerRect.left - tooltipRect.width).toString() + 'px';
  } else {
    tooltipDiv.style.left = containerRect.right.toString() + 'px';
  }
}

features.add(
  import.meta.url,
  init,
  'Mat: Hover over any material to quickly see material market buttons.',
);
