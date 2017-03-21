import { call, put, fork, take, takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';

import * as MeterAction from './../actions/MeterAction';
import * as MeterValueAction from './../actions/MeterValueAction';
import * as MeterTypeAction from './../../Constants/actions/MeterTypeAction';
import * as ServiceAction from './../../Services/actions/ServiceAction';
import * as MeterApi from './../api/MeterApi';
import * as MeterPath from './../paths/MeterPath';
import * as ApiCaller from '../../../util/ApiCaller';
import * as ObjectUtil from './../../../util/ObjectUtil';

export function* getMeters(action) {
  const response = yield call(MeterApi.getMeters, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(MeterAction.getMetersSuccess(response));
  } else if (!response.canceled) {
    yield put(MeterAction.getMetersFailed());
  }
}

export function* watchGetMeters() {
  yield takeLatest(MeterAction.GET_METERS, getMeters);
}

export function* getMeter(action) {
  const response = yield call(MeterApi.getMeter, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(ServiceAction.findServicesByName());
    let sagaAction = yield take([ServiceAction.GET_SERVICES_SUCCESS, ServiceAction.GET_SERVICES_FAILED, LOCATION_CHANGE]);
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(MeterTypeAction.findMeterTypesByName());
      sagaAction = yield take([MeterTypeAction.GET_METER_TYPES_SUCCESS, MeterTypeAction.GET_METER_TYPES_FAILED, LOCATION_CHANGE]);
    }
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(MeterAction.getMeterSuccess(response));
    }
  } else if (!response.canceled) {
    yield put(MeterAction.getMeterFailed(action.id));
  }
}

export function* watchGetMeter() {
  yield takeLatest(MeterAction.GET_METER, getMeter);
}

export function* saveMeter(action) {
  let sagaAction = null;
  const values = action.object.values;
  const valuesLinks = [];
  for (let i = 0; i < values.length; i += 1) {
    const newItem = ObjectUtil.cloneObject(values[i]);
    newItem.meterType = ObjectUtil.getLink(values[i].meterType);
    newItem.service = ObjectUtil.getLink(values[i].service);
    yield put(MeterValueAction.saveMeterValue(newItem));
    sagaAction = yield take([MeterValueAction.SAVE_METER_VALUE_SUCCESS, MeterValueAction.SAVE_METER_VALUE_FAILED]);
    if (sagaAction.type === MeterValueAction.SAVE_METER_VALUE_SUCCESS) {
      valuesLinks.push(ObjectUtil.getLink(sagaAction.data));
    } else {
      break;
    }
  }

  if (sagaAction == null || (sagaAction && sagaAction.type === MeterValueAction.SAVE_METER_VALUE_SUCCESS)) {
    const objectMeter = ObjectUtil.cloneObject(action.object);
    objectMeter.values = valuesLinks;
    const response = yield call(MeterApi.saveMeter, objectMeter);
    if (response && !response.error && !response.canceled) {
      yield put(MeterAction.saveMeterSuccess(response));
      yield call(browserHistory.push, MeterPath.METER_LIST);
    } else if (!response.canceled) {
      const data = {
        httpStatus: response.status,
        object: action.object,
      };
      yield put(MeterAction.saveMeterFailed(data));
    }
  } else if (sagaAction) {
    const data = {
      httpStatus: sagaAction.data.httpStatus,
      object: action.object,
    };
    yield put(MeterAction.saveMeterFailed(data));
  }
}

export function* watchSaveMeter() {
  yield takeLatest(MeterAction.SAVE_METER, saveMeter);
}

export function* deleteMeter(action) {
  const response = yield call(MeterApi.deleteMeter, action.object);
  if (response === '') {
    yield put(MeterAction.deleteMeterSuccess(action.object));
    yield put(MeterAction.getMeters());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(MeterAction.deleteMeterFailed(data));
  }
}

export function* watchDeleteMeter() {
  yield takeLatest(MeterAction.DELETE_METER, deleteMeter);
}

export function* newMeter() {
  yield call(ApiCaller.cancelAllRequests);
  yield put(ServiceAction.findServicesByName());
  let sagaAction = yield take([ServiceAction.GET_SERVICES_SUCCESS, ServiceAction.GET_SERVICES_FAILED, LOCATION_CHANGE]);
  if (sagaAction.type !== LOCATION_CHANGE) {
    yield put(MeterTypeAction.findMeterTypesByName());
    sagaAction = yield take([MeterTypeAction.GET_METER_TYPES_SUCCESS, MeterTypeAction.GET_METER_TYPES_FAILED, LOCATION_CHANGE]);
  }
}

export function* watchNewMeter() {
  yield takeLatest(MeterAction.NEW_METER, newMeter);
}

export function* findMeters(action) {
  const response = yield call(MeterApi.findMeters, action.meterType, action.service, action.name, action.serialNumber, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(MeterAction.getMetersSuccess(response));
  } else if (!response.canceled) {
    yield put(MeterAction.getMetersFailed());
  }
}
export function* findMetersIndividual(action) {
  const response = yield call(MeterApi.findMetersIndividual, action.service, action.name, action.serialNumber, action.page, action.size);
  if (response && !response.error && !response.canceled) {
    yield put(MeterAction.getMetersSuccess(response));
  } else if (!response.canceled) {
    yield put(MeterAction.getMetersFailed());
  }
}
export function* findMetersCommonHouse(action) {
  const response = yield call(MeterApi.findMetersCommonHouse, action.service, action.name, action.serialNumber, action.page, action.size);
  if (response && !response.error && !response.canceled) {
    yield put(MeterAction.getMetersSuccess(response));
  } else if (!response.canceled) {
    yield put(MeterAction.getMetersFailed());
  }
}

export function* watchFindMeters() {
  yield takeLatest(MeterAction.FIND_METERS, findMeters);
}
export function* watchFindMetersIndividual() {
  yield takeLatest(MeterAction.FIND_METERS_INDIVIDUAL, findMetersIndividual);
}
export function* watchFindMetersCommonHouse() {
  yield takeLatest(MeterAction.FIND_METERS_COMMON_HOUSE, findMetersCommonHouse);
}

export const rootMeterSaga = [
  fork(watchGetMeters),
  fork(watchGetMeter),
  fork(watchSaveMeter),
  fork(watchDeleteMeter),
  fork(watchNewMeter),
  fork(watchFindMeters),
  fork(watchFindMetersIndividual),
  fork(watchFindMetersCommonHouse),
];
