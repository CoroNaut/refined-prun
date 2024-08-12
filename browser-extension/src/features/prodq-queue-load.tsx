import { parseDuration } from '../util';
import buffers from '@src/prun-ui/prun-buffers';
import features from '@src/feature-registry';
import PrunCss from '@src/prun-ui/prun-css';
import { $$ } from 'select-dom';
import { _$$ } from '@src/utils/get-element-by-class-name';
import { widgetAppend } from '@src/utils/vue-mount';

function updateBuffer(buffer: PrunBuffer) {
  if (!buffer.frame.isConnected) {
    return;
  }

  const tag = 'rprun-prod-queue-load';
  for (const element of _$$(tag, buffer.frame)) {
    element.remove();
  }

  const tables = _$$(PrunCss.ProductionQueue.table, buffer.frame);
  for (const table of tables) {
    const rows = $$('tbody:nth-of-type(2) > tr', table);
    const totalTime = rows.map(getEtaFromRow).reduce((x, y) => x + y, 0);
    if (totalTime === 0) {
      continue;
    }
    for (const row of rows) {
      const eta = getEtaFromRow(row);
      const percent = ((eta / totalTime) * 100).toFixed(2);
      const textField = $$('td', row)[6];
      if (textField && eta > 0) {
        widgetAppend(textField, () => <span class={tag}> {percent}%</span>);
      }
    }
  }

  requestAnimationFrame(() => updateBuffer(buffer));
}

function getEtaFromRow(row: Element) {
  const etaCell = row.getElementsByTagName('td').item(5);
  if (etaCell) {
    const etaSpan = etaCell.getElementsByTagName('span').item(0);
    if (etaSpan) {
      return parseDuration(etaSpan.textContent);
    }
  }
  return 0;
}

function init() {
  buffers.observe('PRODQ', updateBuffer);
}

void features.add({
  id: 'prodq-queue-load',
  init,
});
