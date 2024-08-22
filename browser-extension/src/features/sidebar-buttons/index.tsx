import './sidebar-buttons.css';
import { observeReadyElementsByClassName } from '@src/utils/mutation-observer';
import PrunCss from '@src/prun-ui/prun-css';
import features from '@src/feature-registry';
import { widgetAppend } from '@src/utils/vue-mount';
import SidebarButtons from '@src/features/sidebar-buttons/SidebarButtons.vue';

function onSidebarReady(sidebar: HTMLDivElement) {
  widgetAppend(sidebar, SidebarButtons);
}

export function init() {
  observeReadyElementsByClassName(PrunCss.Frame.sidebar, onSidebarReady);
}

void features.add({
  id: 'sidebar-buttons',
  init,
});
