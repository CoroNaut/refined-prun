import { formatCurrency } from '@src/utils/format';
import { cxobStore } from '@src/infrastructure/prun-api/data/cxob';
import classes from './mat-market-tooltip.module.css';
import { applyCssRule } from '@src/infrastructure/prun-ui/refined-prun-css';
import tooltipVueTemplate from './mat-market-tooltip.vue';
import { reactive } from 'vue';

export const store = reactive({
  showTooltip: false,
  materialID: '',
  marketData: {},
});

function init() {
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
    const tooltip = document.createElement('div');
    tooltip.id = 'mat_market_tooltip_ID';
    tooltip.classList.add('mat_market_tooltip');
    applyCssRule('.mat_market_tooltip', classes.mat_market_tooltip);
    container.parentElement.appendChild(tooltip);

    createFragmentApp(tooltipVueTemplate).appendTo(tooltip as Node);
  }
}

function applyMarketTooltip(container: Element) {
  const containerClassList = Array.from(container.classList);
  const rpTickerMaterial = containerClassList.find(cls => cls.startsWith('rp-ticker-'));
  //get our tooltip div to be able to set its market data
  const tooltipDiv = document.getElementById('mat_market_tooltip_ID');

  if (rpTickerMaterial && tooltipDiv) {
    const material = rpTickerMaterial.split('-')[2];
    //shipment doesn't need market details
    if (container.hasAttribute('title') && material == 'SHPT') {
      container.setAttribute(
        'mat_market_tooltip_data',
        container.getAttribute('title') || "Error, 'title' not found",
      );
      container.removeAttribute('title');
    }

    //move tooltip to the container with a mouseover event
    if (!container.hasAttribute('mouseover')) {
      container.setAttribute('mouseover', '');
      container.addEventListener('mouseover', () => {
        //calcTooltipLocation depends on getMarketDataTooltop to position itself correctly because it needs the tooltip's height
        tooltipDiv.style.display = 'inline-block';
        store.showTooltip = getMarketDataTooltip(container, material);
        calcTooltipLocation(container, tooltipDiv, document.body);
      });
    }
    //just hide the tooltip on mouseout
    if (!container.hasAttribute('mouseout')) {
      container.setAttribute('mouseout', '');
      container.addEventListener('mouseout', () => {
        tooltipDiv.style.display = 'none';
      });
    }
    //remove title just so the default browser tooltip doesn't show
    if (container.hasAttribute('title')) {
      container.removeAttribute('title');
    }
  }
}

function getMarketDataTooltip(container, material: string): boolean {
  //shipment doesn't need market details
  if (material == 'SHPT') {
    return container.getAttribute('mat_market_tooltip_data') || '';
  }
  store.materialID = material;
  let hasData = false;
  //use cxobStore to get market data
  for (const exchange of ['AI1', 'CI1', 'CI2', 'IC1', 'NC1', 'NC2']) {
    const ticker = material + '.' + exchange;
    const cxobStoreInfo = cxobStore.getByTicker(ticker);
    if (cxobStoreInfo) {
      hasData = true;
      store.marketData[exchange] = [
        formatCurrency(cxobStoreInfo.ask?.price.amount || null),
        (cxobStoreInfo.ask?.amount ?? 0).toLocaleString(),
        formatCurrency(cxobStoreInfo.bid?.price.amount || null),
        (cxobStoreInfo.bid?.amount ?? 0).toLocaleString(),
        cxobStoreInfo.supply.toLocaleString(),
        cxobStoreInfo.demand.toLocaleString(),
      ];
    } else {
      store['marketData'][exchange] = null;
      //TODO if the store doesn't have the data, fetch from FIO
      //getFIOAPIData(ticker)
    }
  }
  return hasData;
}

function getFIOAPIData(materialTicker): Promise<object> {
  return fetch('https://rest.fnar.net/exchange/' + materialTicker)
    .then(res => res.json())
    .then(res => {
      return res as object;
    });
}

function calcTooltipLocation(container, tooltipDiv, documentBody) {
  const containerRect = container.getBoundingClientRect();
  const tooltipRect = tooltipDiv.getBoundingClientRect();
  const documentRect = documentBody.getBoundingClientRect();

  //basic right-hand edge detection only
  let left = '';
  if (tooltipRect.width + containerRect.right + 10 > documentRect.right) {
    left = (containerRect.left - tooltipRect.width - 10).toString() + 'px';
  } else {
    left = (containerRect.right + 10).toString() + 'px';
  }
  const containerMidHeight = (containerRect.top + containerRect.bottom) / 2;
  const top = (containerMidHeight - tooltipRect.height / 2).toString() + 'px';

  tooltipDiv.style.left = left;
  tooltipDiv.style.top = top;
}

features.add(import.meta.url, init, 'Mat: Hover over any material to quickly see market info.');
