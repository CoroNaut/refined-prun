import { watchEffectWhileNodeAlive } from '@src/utils/watch';

export function createReactiveSpan(owner: Node, text: Ref<string | undefined>) {
  const element = document.createElement('span');
  watchEffectWhileNodeAlive(owner, () => {
    element.style.display = text.value === undefined ? 'none' : '';
    element.textContent = text.value ?? null;
  });
  return element;
}

export function createReactiveDiv(owner: Node, text: Ref<string | undefined>) {
  const element = document.createElement('div');
  watchEffectWhileNodeAlive(owner, () => {
    element.style.display = text.value === undefined ? 'none' : '';
    element.textContent = text.value ?? null;
  });
  return element;
}
