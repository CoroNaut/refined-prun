import './MaterialIcon.css';
import PrunCss from '@src/prun-ui/prun-css';
import classNames from 'classnames';
import { h } from 'preact';
import ColoredIcon from '@src/components/ColoredIcon';
import { showBuffer } from '@src/util';
import usePrunData from '@src/hooks/use-prun-data';
import { selectContractById } from '@src/prun-api/data/selectors';

interface Props {
  contractId: string;
  small?: boolean;
}

export default function ShipmentIcon({ small, contractId }: Props) {
  const contract = usePrunData(s => selectContractById(s, contractId));

  const classes = classNames('rprun-MaterialIcon__container', PrunCss.MaterialIcon.container, {
    'rprun-mat-element-small': small,
    'rprun-mat-element-large': !small,
  });

  const onClick = () => showBuffer(`CONT ${contract.localId}`);

  return (
    <div class={classes}>
      <ColoredIcon ticker="SHPT" onClick={onClick} />
    </div>
  );
}
