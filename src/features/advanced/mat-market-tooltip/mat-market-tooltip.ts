import { showBuffer } from '@src/infrastructure/prun-ui/buffers';
import { applyScopedCssRule } from '@src/infrastructure/prun-ui/refined-prun-css';
import { refTextContent } from '@src/utils/reactive-dom';
import { watchEffectWhileNodeAlive } from '@src/utils/watch';
import { reactive } from 'vue';
import MarketTooltip from './MarketTooltip.vue';
import classes from './mat-market-tooltip.module.css';

export const store = reactive({
  selectedExchange: 'AI1',
  materialID: '',
  tooltipElement: undefined as HTMLElement | undefined,
  showTooltip(container: HTMLElement, ticker: string) {
    this.materialID = ticker;
    this.tooltipElement!.style.display = 'block';
    store.setLocationToContainer(container);
  },
  hideTooltip() {
    this.tooltipElement!.style.display = 'none';
  },
  showBuffer(cmd: string) {
    this.hideTooltip();
    if (cmd === 'CXM') {
      return showBuffer(`CXM ${this.materialID}`);
    } else if (['CXP', 'CXPC', 'CXPO', 'CXOB'].includes(cmd)) {
      return showBuffer(`${cmd} ${this.materialID}.${this.selectedExchange}`);
    }
    return;
  },
  getTooltipElement() {
    if (!this.tooltipElement) {
      const element = document.getElementById('mat_market_tooltip');
      if (element) {
        this.tooltipElement = element as HTMLElement;
      }
    }
  },
  setLocationToContainer(container: HTMLElement) {
    const containerRect = container.getBoundingClientRect();

    const tooltipRect = this.tooltipElement!.getBoundingClientRect();

    const containerMidHeight = (containerRect.top + containerRect.bottom) / 2;
    this.tooltipElement!.style.top =
      (containerMidHeight - tooltipRect.height / 2).toString() + 'px';

    //basic right-hand edge detection only
    const documentRect = this.tooltipElement?.parentElement!.getBoundingClientRect();
    if (tooltipRect.width + containerRect.right > documentRect!.right) {
      this.tooltipElement!.style.left = (containerRect.left - tooltipRect.width).toString() + 'px';
    } else {
      this.tooltipElement!.style.left = containerRect.right.toString() + 'px';
    }
  },
});

function onTileReady(tile: PrunTile) {
  subscribe($$(tile.anchor, C.ColoredIcon.label), label => {
    const container = label.closest(`.${C.ColoredIcon.container}`) as HTMLElement;
    const ticker = refTextContent(label);
    if (!container || !ticker.value || ticker.value === 'SHPT') {
      return;
    }
    watchEffectWhileNodeAlive(label, () => {
      container.addEventListener('mouseenter', async () => {
        store.showTooltip(container, ticker.value!);
      });

      container.addEventListener('mouseleave', () => {
        if (!store.tooltipElement!.matches(':hover')) {
          store.hideTooltip();
        }
      });

      if (container.hasAttribute('title')) {
        container.removeAttribute('title');
      }
    });
  });
}

function init() {
  const commands = [
    'BBC',
    'BBL',
    'BLU',
    'BRA',
    'BS',
    'BUI',
    'CONT',
    'CX',
    'HQ',
    'INV',
    'MAT',
    'PLI',
    'PROD',
    'PRODQ',
    'SHPF',
    'SHPI',
    'SYSI',
    'WAR',
    'WF',
  ];
  applyScopedCssRule(
    commands,
    `.${C.ColoredIcon.labelContainer} > .${C.ColoredIcon.label}`,
    classes.coloredIcon,
  );

  const container = document.getElementById('container');
  if (container?.parentElement) {
    createFragmentApp(MarketTooltip).appendTo(container as Node);
    store.getTooltipElement();
  }

  tiles.observe(commands, onTileReady);
}

features.add(
  import.meta.url,
  init,
  'MAT: Hover over any material to quickly see material market buttons.',
);
