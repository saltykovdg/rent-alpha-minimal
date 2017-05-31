import { call, put, fork, takeLatest, all } from 'redux-saga/effects';

import * as CommonAction from './../actions/CommonAction';
import * as ApiCaller from '../../../util/ApiCaller';

export function* downloadContent(action) {
  const response = yield call(ApiCaller.downloadFile, action.url, 'get');
  if (response && !response.error && !response.canceled) {
    yield put(CommonAction.downloadContentSuccess());
  } else if (!response.canceled) {
    yield put(CommonAction.downloadContentFailed());
  }
}

export function* watchDownloadContent() {
  yield takeLatest(CommonAction.DOWNLOAD_CONTENT, downloadContent);
}

export const rootCommonSaga = all([
  fork(watchDownloadContent),
]);
