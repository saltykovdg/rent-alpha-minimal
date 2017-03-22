import { call, put, fork, takeLatest } from 'redux-saga/effects';

import * as BuildingMeterAction from './../actions/BuildingMeterAction';
import * as BuildingMeterApi from './../api/BuildingMeterApi';
import * as ApiCaller from '../../../util/ApiCaller';

export function* getBuildingMeters(action) {
  const response = yield call(BuildingMeterApi.getBuildingMeters, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(BuildingMeterAction.getBuildingMetersSuccess(response));
  } else if (!response.canceled) {
    yield put(BuildingMeterAction.getBuildingMetersFailed());
  }
}

export function* watchGetBuildingMeters() {
  yield takeLatest(BuildingMeterAction.GET_BUILDING_METERS, getBuildingMeters);
}

export function* getBuildingMeter(action) {
  const response = yield call(BuildingMeterApi.getBuildingMeter, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(BuildingMeterAction.getBuildingMeterSuccess(response));
  } else if (!response.canceled) {
    yield put(BuildingMeterAction.getBuildingMeterFailed(action.id));
  }
}

export function* watchGetBuildingMeter() {
  yield takeLatest(BuildingMeterAction.GET_BUILDING_METER, getBuildingMeter);
}

export function* saveBuildingMeter(action) {
  const response = yield call(BuildingMeterApi.saveBuildingMeter, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(BuildingMeterAction.saveBuildingMeterSuccess(response));
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(BuildingMeterAction.saveBuildingMeterFailed(data));
  }
}

export function* watchSaveBuildingMeter() {
  yield takeLatest(BuildingMeterAction.SAVE_BUILDING_METER, saveBuildingMeter);
}

export function* deleteBuildingMeter(action) {
  const response = yield call(BuildingMeterApi.deleteBuildingMeter, action.object);
  if (response === '') {
    yield put(BuildingMeterAction.deleteBuildingMeterSuccess(action.object));
    yield put(BuildingMeterAction.getBuildingMeters());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(BuildingMeterAction.deleteBuildingMeterFailed(data));
  }
}

export function* watchDeleteBuildingMeter() {
  yield takeLatest(BuildingMeterAction.DELETE_BUILDING_METER, deleteBuildingMeter);
}

export function* newBuildingMeter() {
  yield call(ApiCaller.cancelAllRequests);
}

export function* watchNewBuildingMeter() {
  yield takeLatest(BuildingMeterAction.NEW_BUILDING_METER, newBuildingMeter);
}

export const rootBuildingMeterSaga = [
  fork(watchGetBuildingMeters),
  fork(watchGetBuildingMeter),
  fork(watchSaveBuildingMeter),
  fork(watchDeleteBuildingMeter),
  fork(watchNewBuildingMeter),
];
