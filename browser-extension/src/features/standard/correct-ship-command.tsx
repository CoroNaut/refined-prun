import { changeValue } from '@src/util';
import PrunCss from '@src/infrastructure/prun-ui/prun-css';
import features from '@src/feature-registry';
import { $, $$ } from '@src/utils/select-dom';
import { subscribe } from '@src/utils/subscribe-async-generator';
import { shipsStore } from '@src/infrastructure/prun-api/data/ships';

const correctableCommands = new Set(['SFC', 'SHP', 'SHPF', 'SHPI', 'SI']);

async function onSelectorReady(selector: HTMLElement) {
  const input: HTMLInputElement = await $(selector, PrunCss.PanelSelector.input);
  const form = input.form!;
  form.addEventListener('submit', ev => {
    const fullCommand = input.value.split(' ');
    if (!correctableCommands.has(fullCommand[0].toUpperCase())) {
      return;
    }

    const commandParts = fullCommand.slice(1);
    const shipName = commandParts.join(' ');
    const ship = shipsStore.getByName(shipName);
    if (!ship || shipName === ship.registration) {
      return;
    }

    ev.stopPropagation();
    const newCommandParts = [fullCommand[0], ship.registration];
    changeValue(input, newCommandParts.join(' '));
    setTimeout(() => form.requestSubmit(), 0);
  });
}

export function init() {
  subscribe($$(document, PrunCss.Tile.selector), onSelectorReady);
}

void features.add({
  id: 'correct-ship-command',
  init,
});
