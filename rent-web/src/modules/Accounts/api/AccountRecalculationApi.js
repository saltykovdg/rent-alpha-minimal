import * as ApiCaller from '../../../util/ApiCaller';

export function getAccountRecalculations(accountId, page = 0, size = 5) {
  const query = `?accountId=${accountId}&page=${page}&size=${size}`;
  return ApiCaller.callApi(`recalculation/get${query}`);
}

export function addAccountRecalculation(accountServiceId, sum, note) {
  const query = `?accountServiceId=${accountServiceId}&sum=${sum}&note=${note}`;
  return ApiCaller.callApi(`recalculation/add${query}`, 'post');
}

export function deleteAccountRecalculation(bundleId) {
  const query = `?bundleId=${bundleId}`;
  return ApiCaller.callApi(`recalculation/delete${query}`, 'delete');
}
