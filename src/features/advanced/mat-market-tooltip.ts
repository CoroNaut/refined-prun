import { formatCurrency } from '@src/utils/format';
import { cxobStore } from '@src/infrastructure/prun-api/data/cxob';

function init() {
  // Watch for new elements and class changes so we can give them the tooltip
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      console.log(mutation.type);
      // if any new buffer gets opened, add the tooltip to all mats like in 'XIT MATS'
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const newContainers = (node as Element).querySelectorAll(
              '.ColoredIcon__container___djaR4r2',
            );
            newContainers.forEach(container => {
              applyMarketTooltip(container);
            });
          }
        });
        // monitor for class changes because main()->initializeUI()->trackItemTickers() adds the class 'rp-ticker-'
        // these classes may not be added before this feature gets called
      } else if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target as Element;
        if (target.classList.contains('ColoredIcon__container___djaR4r2')) {
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
    const containers = document.querySelectorAll('.ColoredIcon__container___djaR4r2');
    containers.forEach(container => {
      applyMarketTooltip(container);
    });
  });
}

function applyMarketTooltip(container: Element) {
  const containerClassList = Array.from(container.classList);
  const rpTickerMaterial = containerClassList.find(cls => cls.startsWith('rp-ticker-'));
  if (rpTickerMaterial) {
    //generate tooltip
    const material = rpTickerMaterial.split('-')[2];
    const materialOrdersArray = [[material, 'Ask', 'A-Amt', 'Bid', 'B-Amt', 'Supply', 'Demand']];
    for (const exchange of ['AI1', 'CI1', 'CI2', 'IC1', 'NC1', 'NC2']) {
      const ticker = material + '.' + exchange;
      const store = cxobStore.getByTicker(ticker);
      if (store) {
        materialOrdersArray.push([
          exchange,
          formatCurrency(store.ask?.price.amount || null),
          store.ask?.amount?.toString() || '--',
          formatCurrency(store.bid?.price.amount || null),
          store.bid?.amount?.toString() || '--',
          store.supply.toString(),
          store.demand.toString(),
        ]);
      }
    }

    if (materialOrdersArray.length == 1) {
      const resultTable =
        materialOrdersArray.map(cell => ` ${cell.toString().padEnd(6)} `).join(' ') +
        '\nOpen CX to fetch prices for this material.';
      container.setAttribute('title', resultTable);
    } else {
      let resultTable = '';
      materialOrdersArray.forEach(row => {
        resultTable += row.map(cell => ` ${cell.toString().padEnd(6)} `).join(' ') + '\n';
      });
      container.setAttribute('title', resultTable);
    }
  }
}

features.add(import.meta.url, init, 'Mat: Hover over any material to quickly see market info.');
