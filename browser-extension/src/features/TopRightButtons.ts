import { Module } from '@src/ModuleRunner';
import { genericCleanup, getBuffersFromList, showBuffer } from '@src/util';
import { Selector } from '@src/Selector';

// Creates top right buttons (calculator + open new buffer for now)
export class TopRightButtons implements Module {
  private tag = 'pb-buttons';
  frequency = 2;

  cleanup(full: boolean = false) {
    full && genericCleanup(this.tag);
  }

  run(allBuffers) {
    const calcTags = ['LM', 'CX', 'XIT'];
    const buffers = getBuffersFromList('', allBuffers);
    buffers.forEach(buffer => {
      const tileControls = buffer.querySelector(Selector.TileControls);
      const header = buffer.querySelector(Selector.BufferHeader);
      if (!header || !tileControls || !header.textContent) {
        return;
      }

      if (tileControls.classList.contains(this.tag)) {
        return;
      }
      tileControls.classList.add(this.tag);

      const match = header.textContent.match(/^[^\s]*/);
      const bufferCode = match ? match[0] : header.textContent;

      // Insert calculator button
      if (calcTags.includes(bufferCode.toUpperCase())) {
        const calcDiv = document.createElement('div');
        calcDiv.classList.add('button-upper-right');
        calcDiv.style.marginTop = __CHROME__ ? '-3px' : '-4px';
        tileControls.insertBefore(calcDiv, tileControls.children[0]);

        const svgContainer = document.createElement('div');
        const svg = document.createElement('svg');
        svgContainer.appendChild(svg);
        svg.outerHTML = `<svg height="12px" width="12px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                 viewBox="0 0 460 460" xml:space="preserve">
              <g id="XMLID_241_">
                <g>
                  <path d="M369.635,0H90.365C73.595,0,60,13.595,60,30.365v399.27C60,446.405,73.595,460,90.365,460h279.27
                    c16.77,0,30.365-13.595,30.365-30.365V30.365C400,13.595,386.405,0,369.635,0z M108.204,343.61v-43.196
                    c0-3.451,2.797-6.248,6.248-6.248h43.196c3.451,0,6.248,2.797,6.248,6.248v43.196c0,3.451-2.797,6.248-6.248,6.248h-43.196
                    C111.001,349.858,108.204,347.06,108.204,343.61z M108.204,256.61v-43.196c0-3.451,2.797-6.248,6.248-6.248h43.196
                    c3.451,0,6.248,2.797,6.248,6.248v43.196c0,3.451-2.797,6.248-6.248,6.248h-43.196C111.001,262.858,108.204,260.06,108.204,256.61
                    z M308.891,421H151.109c-11.046,0-20-8.954-20-20c0-11.046,8.954-20,20-20h157.782c11.046,0,20,8.954,20,20
                    C328.891,412.046,319.937,421,308.891,421z M208.402,294.165h43.196c3.451,0,6.248,2.797,6.248,6.248v43.196
                    c0,3.451-2.797,6.248-6.248,6.248h-43.196c-3.451,0-6.248-2.797-6.248-6.248v-43.196
                    C202.154,296.963,204.951,294.165,208.402,294.165z M202.154,256.61v-43.196c0-3.451,2.797-6.248,6.248-6.248h43.196
                    c3.451,0,6.248,2.797,6.248,6.248v43.196c0,3.451-2.797,6.248-6.248,6.248h-43.196C204.951,262.858,202.154,260.06,202.154,256.61
                    z M345.548,349.858h-43.196c-3.451,0-6.248-2.797-6.248-6.248v-43.196c0-3.451,2.797-6.248,6.248-6.248h43.196
                    c3.451,0,6.248,2.797,6.248,6.248v43.196h0C351.796,347.061,348.999,349.858,345.548,349.858z M345.548,262.858h-43.196
                    c-3.451,0-6.248-2.797-6.248-6.248v-43.196c0-3.451,2.797-6.248,6.248-6.248h43.196c3.451,0,6.248,2.797,6.248,6.248v43.196h0
                    C351.796,260.061,348.999,262.858,345.548,262.858z M354,149.637c0,11.799-9.565,21.363-21.363,21.363H127.364
                    C115.565,171,106,161.435,106,149.637V62.363C106,50.565,115.565,41,127.364,41h205.273C344.435,41,354,50.565,354,62.363V149.637
                    z"/>
                </g>
              </g>
              </svg>`;
        calcDiv.appendChild(svgContainer);
        calcDiv.addEventListener('click', function () {
          showBuffer('XIT CALCULATOR');
        });
      }

      // Insert open button
      const openDiv = document.createElement('div');
      openDiv.classList.add('button-upper-right');
      openDiv.textContent = '↗';
      openDiv.style.marginTop = __CHROME__ ? '3px' : '-3px';
      openDiv.style.fontSize = __CHROME__ ? '16px' : '20px';
      openDiv.style.paddingRight = '1px';
      openDiv.style.paddingLeft = '1px';

      openDiv.addEventListener('click', function () {
        showBuffer(header.textContent);
      });

      const hiddenControls = tileControls.querySelector(Selector.HiddenControls);
      if (!hiddenControls) {
        return;
      }

      hiddenControls.firstChild.insertBefore(openDiv, hiddenControls.firstChild.children[0]);
    });
  }
}
