import { computed } from 'vue';
import {
  partnerNonCurrentConditions,
  selfNonCurrentConditions,
  sumAccountsPayable,
  sumLoanRepayments,
  sumDeliveries,
  sumMaterialsShipment,
  sumMaterialsPickup,
} from '@src/core/balance/contract-conditions';
import { buildingsTotal, currentBuildingValue } from '@src/core/balance/buildings';

const accountsReceivable = computed(() => sumAccountsPayable(partnerNonCurrentConditions));

const longTermLoans = computed(() => sumLoanRepayments(partnerNonCurrentConditions));

const materialsToReceive = computed(
  () =>
    sumDeliveries(partnerNonCurrentConditions) +
    sumMaterialsShipment(partnerNonCurrentConditions) +
    sumMaterialsPickup(selfNonCurrentConditions),
);

const total = computed(() => {
  return (
    buildingsTotal.value + accountsReceivable.value + materialsToReceive.value + longTermLoans.value
  );
});

export const nonCurrentAssets = {
  buildings: currentBuildingValue,
  buildingsTotal,
  accountsReceivable,
  materialsToReceive,
  longTermLoans,
  total,
};
