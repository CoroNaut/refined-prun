import { extractPlanetName } from '@src/util';

function onTileReady(tile: PrunTile) {
  // Only shorten names in the main INV tile
  if (tile.parameter) {
    return;
  }

  subscribe($$(tile.anchor, PrunCss.Link.link), link => {
    if (link.textContent) {
      link.textContent = extractPlanetName(link.textContent);
    }
  });
}

function init() {
  tiles.observe('INV', onTileReady);
}

features.add({
  id: 'inv-shorten-planet-names',
  description: 'INV: Shortens addresses in the main INV command.',
  advanced: true,
  init,
});
