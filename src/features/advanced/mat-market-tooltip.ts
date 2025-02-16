import { formatCurrency, formatNumber } from '@src/utils/format';
import { cxobStore } from '@src/infrastructure/prun-api/data/cxob';
import classes from './mat-market-tooltip.module.css';
import { applyCssRule } from '@src/infrastructure/prun-ui/refined-prun-css';

function init() {
  // Watch for new elements and class changes so we can give them the tooltip
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      // if any new buffer gets opened, add the tooltip to all mats like in 'XIT MATS'
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
        // these classes may not be added before this feature gets called
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

  // subscribe to cxobStore updates to update tooltips every time the CX updates
  cxobStore.updates.subscribe(() => {
    const containers = document.querySelectorAll('.' + C.ColoredIcon.container);
    containers.forEach(container => {
      applyMarketTooltip(container);
    });
  });

  // Make a div that we can use as our tooltip
  const container = document.getElementById('container');
  if (container?.parentElement) {
    const tooltip = document.createElement('div');
    tooltip.id = 'mat_market_tooltip_ID';
    tooltip.classList.add('mat_market_tooltip');
    applyCssRule('.mat_market_tooltip', classes.mat_market_tooltip);
    container.parentElement.appendChild(tooltip);
  }
}

function applyMarketTooltip(container: Element) {
  const containerClassList = Array.from(container.classList);
  const rpTickerMaterial = containerClassList.find(cls => cls.startsWith('rp-ticker-'));
  //get our tooltip div to be able to set its market data
  const tooltipDiv = document.getElementById('mat_market_tooltip_ID');

  if (rpTickerMaterial && tooltipDiv) {
    //move tooltip to the container with a mouseover event
    if (!container.hasAttribute('mouseover')) {
      container.addEventListener('mouseover', () => {
        const containerRect = container.getBoundingClientRect();
        const tooltipDivRect = tooltipDiv.getBoundingClientRect();
        const documentRect = document.body.getBoundingClientRect();
        if (tooltipDivRect.width + containerRect.right + 10 > documentRect.right) {
          tooltipDiv.style.left = containerRect.left - tooltipDivRect.width - 10 + 'px';
        } else {
          tooltipDiv.style.left = containerRect.right + 10 + 'px';
        }
        const containerMidHeight = (containerRect.top + containerRect.bottom) / 2;
        tooltipDiv.style.top = containerMidHeight - tooltipDivRect.height / 2 + 'px';
        tooltipDiv.style.display = 'inline-block';
        tooltipDiv.innerHTML =
          container.getAttribute('mat_market_tooltip_data') ||
          "Error, 'mat_market_tooltip_data' not found";
      });
    }
    if (!container.hasAttribute('mouseout')) {
      container.addEventListener('mouseout', () => {
        tooltipDiv.style.display = 'none';
      });
    }
    if (rpTickerMaterial == 'rp-ticker-SHPT') {
      if (container.hasAttribute('title')) {
        container.setAttribute(
          'mat_market_tooltip_data',
          container.getAttribute('title') || "Error, 'title' not found",
        );
        container.removeAttribute('title');
      }
      return;
    }
    if (container.hasAttribute('title')) {
      container.removeAttribute('title');
    }

    //generate tooltip
    const material = rpTickerMaterial.split('-')[2];
    const materialOrdersArray = [[material, 'Ask', 'A-Amt', 'Bid', 'B-Amt', 'Supply', 'Demand']];
    for (const exchange of ['AI1', 'CI1', 'CI2', 'IC1', 'NC1', 'NC2']) {
      const store = cxobStore.getByTicker(material + '.' + exchange);
      if (store) {
        materialOrdersArray.push([
          exchange,
          formatNumber(store.ask?.price.amount || null),
          formatNumber(store.ask?.amount ?? null),
          formatNumber(store.bid?.price.amount || null),
          formatNumber(store.bid?.amount ?? null),
          formatNumber(store.supply),
          formatNumber(store.demand),
        ]);
      }
    }

    //apply market data to the tooltip
    let resultTable = '';
    if (materialOrdersArray.length == 1) {
      resultTable = 'Open CX to fetch prices';
    } else {
      materialOrdersArray.forEach(row => {
        resultTable += row.map(cell => `${cell.toString().padEnd(6)}`).join(' ') + '\n';
      });
    }
    container.setAttribute('mat_market_tooltip_data', resultTable);
  }
}

features.add(import.meta.url, init, 'Mat: Hover over any material to quickly see market info.');
