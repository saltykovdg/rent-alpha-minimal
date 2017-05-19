import * as ApiCaller from '../../../util/ApiCaller';

export function getAccountPayments(accountId, page = 0, size = 5) {
  const query = `?accountId=${accountId}&page=${page}&size=${size}`;
  return ApiCaller.callApi(`payment/get${query}`);
}

export function addAccountPayment(accountId, sum) {
  const query = `?accountId=${accountId}&sum=${sum}`;
  return ApiCaller.callApi(`payment/add${query}`, 'post');
}

export function deleteAccountPayment(paymentBundleId) {
  const query = `?paymentBundleId=${paymentBundleId}`;
  return ApiCaller.callApi(`payment/delete${query}`, 'delete');
}
