import { showBuffer } from '@src/infrastructure/prun-ui/buffers';
import { refTextContent } from '@src/utils/reactive-dom';
import { watchEffectWhileNodeAlive } from '@src/utils/watch';
import { ComponentPublicInstance, reactive } from 'vue';
import MarketTooltip from './MarketTooltip.vue';

export const store = reactive({
  selectedExchange: 'AI1',
  materialID: '',
  tooltipElement: {} as HTMLElement,
  tooltipStyle: {
    display: 'none',
    left: '0px',
    top: '0px',
  },
  async showTooltip(container: HTMLElement, ticker: string) {
    this.materialID = ticker;
    this.tooltipStyle.display = 'block';
    await nextTick();
    store.setLocationToContainer(container);
  },
  hideTooltip() {
    this.tooltipStyle.display = 'none';
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
  setTooltipElement(componentInstance: ComponentPublicInstance) {
    this.tooltipElement = (componentInstance as any).$el as HTMLElement;
  },
  setLocationToContainer(container: HTMLElement) {
    const containerRect = container.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();
    const containerMidHeight = (containerRect.top + containerRect.bottom) / 2;
    this.tooltipStyle.top = (containerMidHeight - tooltipRect.height / 2).toString() + 'px';

    //basic right-hand edge detection only
    const documentRect = this.tooltipElement.parentElement!.getBoundingClientRect();
    if (tooltipRect.width + containerRect.right > documentRect!.right) {
      this.tooltipStyle.left = (containerRect.left - tooltipRect.width).toString() + 'px';
    } else {
      this.tooltipStyle.left = containerRect.right.toString() + 'px';
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
    watchEffectWhileNodeAlive(label, onCleanup => {
      const showTooltip = () => {
        store.showTooltip(container, ticker.value!);
      };
      const hideTooltip = () => {
        if (!store.tooltipElement!.matches(':hover')) {
          store.hideTooltip();
        }
      };
      container.addEventListener('mouseenter', showTooltip);
      container.addEventListener('mouseleave', hideTooltip);

      if (container.hasAttribute('title')) {
        container.removeAttribute('title');
      }
      onCleanup(() => {
        container.removeEventListener('mouseenter', showTooltip);
        container.removeEventListener('mouseleave', hideTooltip);
      });
    });
  });
}

async function init() {
  const container = document.getElementById('container');
  if (container?.parentElement) {
    store.setTooltipElement(createFragmentApp(MarketTooltip).appendTo(container));
  }

  tiles.observe(
    [
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
    ],
    onTileReady,
  );
}

features.add(
  import.meta.url,
  init,
  'MAT: Hover over any material to quickly see material market buttons.',
);
