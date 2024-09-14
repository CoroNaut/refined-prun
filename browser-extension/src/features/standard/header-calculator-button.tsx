import tiles from '@src/infrastructure/prun-ui/tiles';
import features from '@src/feature-registry';
import { showBuffer } from '@src/util';
import PrunCss from '@src/infrastructure/prun-ui/prun-css';
import descendantPresent from '@src/utils/descendant-present';
import system from '@src/system';
import { createFragmentApp } from '@src/utils/vue-fragment-app';

async function onTileReady(tile: PrunTile) {
  if (!tile.firstActivation) {
    return;
  }
  const tileControls = await descendantPresent(tile.frame, PrunCss.TileFrame.controls);
  const path = system.runtime.getURL('images/calculator-button.svg');
  createFragmentApp(() => (
    <div
      class="button-upper-right"
      style={{ marginTop: __CHROME__ ? '-3px' : '-4px' }}
      onClick={() => showBuffer('XIT CALCULATOR')}>
      <img src={path} alt="Calculator icon" />
    </div>
  )).before(tileControls.children[0]);
}

export function init() {
  tiles.observe(['LM', 'CX', 'XIT'], onTileReady);
}

void features.add({
  id: 'header-calculator-button',
  init,
});
