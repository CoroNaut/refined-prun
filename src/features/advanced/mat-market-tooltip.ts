import classes from './mat-market-tooltip.module.css';
import { applyCssRule } from '@src/infrastructure/prun-ui/refined-prun-css';
import tooltipVueTemplate from './mat-market-tooltip.vue';
import { reactive } from 'vue';
import { NONAME } from 'dns';

export const store = reactive({
  exchanges: ['AI1', 'CI1', 'CI2', 'IC1', 'NC1', 'NC2'],
  selectedExchange: 'AI1',
  materialID: '',
  shipmentID: '',
  tooltipElement: {} as HTMLElement,
  showTooltip() {
    if (Object.keys(this.tooltipElement).length) {
      this.getTooltipElement();
    }
    if (this.tooltipElement) {
      (this.tooltipElement as HTMLElement).style.display = 'block';
    }
  },
  hideTooltip() {
    if (Object.keys(this.tooltipElement).length) {
      this.getTooltipElement();
    }
    if (this.tooltipElement) {
      (this.tooltipElement as HTMLElement).style.display = 'none';
    }
  },
  getTooltipElement() {
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
  // Watch for new elements and class changes so we can give them the event listener to summon tooltip
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      // if any new buffer gets opened, add the event listener to all mats like in 'XIT MATS'
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const newContainers = (node as Element).querySelectorAll(C.ColoredIcon.container);
            newContainers.forEach(container => {
              applyMarketTooltip(container);
            });
          }
        });
        // monitor for class changes because main()->initializeUI()->trackItemTickers() adds the class 'rp-ticker-'
        // these classes may not be loaded before this feature gets called. The below code fetches those changes
      } else if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target as Element;
        if (target.classList.contains(C.ColoredIcon.container)) {
          applyMarketTooltip(target);
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  });

  // Make a div that we can use as our tooltip
  const container = document.getElementById('container');
  if (container?.parentElement) {
    createFragmentApp(tooltipVueTemplate).appendTo(container as Node);
    store.getTooltipElement();
    console.log(store.tooltipElement);
  }
}

function applyMarketTooltip(container: Element) {
  const containerClassList = Array.from(container.classList);
  const rpTickerMaterial = containerClassList.find(cls => cls.startsWith('rp-ticker-'));
  //get our tooltip div to be able to set its market data
  const tooltipDiv = store.tooltipElement;

  if (rpTickerMaterial && tooltipDiv) {
    const material = rpTickerMaterial.split('-')[2];
    //shipment doesn't need market details
    if (container.hasAttribute('title') && material == 'SHPT') {
      container.setAttribute(
        'mmt_shpt_info',
        container.getAttribute('title') || "Error, 'title' not found",
      );
      container.removeAttribute('title');
    }

    //move tooltip to the container with a mouseenter event
    if (!container.hasAttribute('mouseenter')) {
      container.setAttribute('mouseenter', '');
      container.addEventListener('mouseenter', async () => {
        //calcTooltipLocation depends on getMarketDataTooltop to position itself correctly because it needs the tooltip's height
        store.showTooltip();
        setTooltipMaterial(container, material);
        await nextTick();
        calcTooltipLocation(container, tooltipDiv, document.body);
      });
    }
    //just hide the tooltip on mouseleave
    if (!container.hasAttribute('mouseleave')) {
      container.setAttribute('mouseleave', '');
      container.addEventListener('mouseleave', () => {
        if (!tooltipDiv.matches(':hover')) {
          store.hideTooltip();
        }
      });
    }
    //remove title just so the default browser tooltip doesn't show
    if (container.hasAttribute('title')) {
      container.removeAttribute('title');
    }
  }
}
//🛈🗠🕮⇄
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
  const tooltipRect = tooltipDiv.getBoundingClientRect();
  const documentRect = documentBody.getBoundingClientRect();
  const fivePercentContainer = containerRect.width * 0.05 > 2 ? containerRect.width * 0.05 : 2;

  //basic right-hand edge detection only
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
