import * as ApiCaller from '../../../util/ApiCaller';

export function calculateAccounts(periodStartId, periodEndId) {
  const query = `?periodStartId=${periodStartId}&periodEndId=${periodEndId}`;
  return ApiCaller.callApi(`calculation/calculate-accounts${query}`);
}

export function closeWorkingPeriod() {
  return ApiCaller.callApi('calculation/close-working-period');
}
