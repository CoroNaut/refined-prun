import './START.css';
import { Link } from '@src/components/Link';
import { h } from 'preact';
import xit from './xit-registry';

function START() {
  return (
    <div class="rprun-XIT-START">
      <span class="rprun-XIT-title" style={{ paddingLeft: '0' }}>
        Thank you for using PMMG Extended!
      </span>
      <p>This is a short tutorial on how to get the most out of the extension.</p>
      <p>
        Details on what PMMG offers can be found here:&nbsp;
        <a
          href="https://sites.google.com/view/pmmgextended/home?authuser=0"
          target="_blank"
          class="link"
          style={{ display: 'inline-block' }}
          rel="noreferrer">
          PMMG Extended
        </a>
      </p>
      <p>
        You can find a list of all of the PMMG commands using
        <Link command="XIT HELP" style={{ display: 'inline-block' }}>
          XIT HELP
        </Link>
      </p>
      <p>
        PMMG&apos;s settings can be accessed using
        <Link command="XIT SETTINGS" style={{ display: 'inline-block' }}>
          XIT SETTINGS
        </Link>
      </p>
      <p>
        To get PMMG to show you data about your space empire, you need to &apos;scan in&apos; your bases by refreshing
        the page, then opening each of your production lines. You can check how much data has been scanned in using the
        XIT HEALTH buffer.
      </p>
      <p>
        Once you have scanned in your data, one of the biggest PMMG features is in the XIT FIN buffer. It tracks your
        finances more accurately than the in game FIN buffer.
      </p>
      <p>Contact PiBoy314 in game or on Discord if you have questions.</p>
    </div>
  );
}

xit.add({
  command: 'START',
  name: 'PMMG INTRODUCTION',
  component: START,
});
