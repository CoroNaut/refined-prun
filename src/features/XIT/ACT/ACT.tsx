import './ACT.css';

import './actions/cx-buy';
import './actions/mtra';

import './material-groups/repair';
import './material-groups/resupply';
import './material-groups/manual';

import ACT from '@src/features/XIT/ACT/ACT.vue';

xit.add({
  command: ['ACT', 'ACTION'],
  name: parameters => {
    if (parameters.length === 1) {
      return 'ACTION PACKAGES';
    }
    if (parameters[1].toUpperCase() == 'GEN' || parameters[1].toUpperCase() == 'EDIT') {
      return 'EDIT ACTION PACKAGE';
    }
    return 'EXECUTE ACTION PACKAGE';
  },
  description: 'Allows to automate certain tasks.',
  optionalParameters: 'GEN and/or Action Name',
  contextItems: parameters => (parameters.length > 1 ? [{ cmd: 'XIT ACT' }] : []),
  component: () => ACT,
});
