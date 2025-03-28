import { createFragmentApp } from '@src/utils/vue-fragment-app';
import { showBuffer } from '@src/infrastructure/prun-ui/buffers';
import TileControlsButton from '@src/components/TileControlsButton.vue';

async function onTileReady(tile: PrunTile) {
  const splitControls = await $(tile.frame, C.TileControls.splitControls);
  createFragmentApp(TileControlsButton, {
    icon: '\uf24d',
    onClick: () => showBuffer(tile.fullCommand, { force: true }),
  }).before(splitControls);
}

function init() {
  tiles.observeAll(onTileReady);
}

features.add(import.meta.url, init, 'Adds a tile duplicate button to the buffer header.');
