import { call, put, fork, take, takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';

import * as ServiceAction from './../../Services/actions/ServiceAction';
import * as MeasurementUnitAction from './../../Constants/actions/MeasurementUnitAction';
import * as NormValueAction from './../actions/NormValueAction';
import * as NormAction from './../actions/NormAction';
import * as NormApi from './../api/NormApi';
import * as NormPath from './../paths/NormPath';
import * as ApiCaller from '../../../util/ApiCaller';
import * as ObjectUtil from './../../../util/ObjectUtil';

export function* getNorms(action) {
  const response = yield call(NormApi.getNorms, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(NormAction.getNormsSuccess(response));
  } else if (!response.canceled) {
    yield put(NormAction.getNormsFailed());
  }
}

export function* watchGetNorms() {
  yield takeLatest(NormAction.GET_NORMS, getNorms);
}

export function* getNorm(action) {
  const response = yield call(NormApi.getNorm, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(ServiceAction.findServicesByName());
    let sagaAction = yield take([ServiceAction.GET_SERVICES_SUCCESS, ServiceAction.GET_SERVICES_FAILED, LOCATION_CHANGE]);
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(MeasurementUnitAction.findMeasurementUnitsByName());
      sagaAction = yield take([MeasurementUnitAction.GET_MEASUREMENT_UNITS_SUCCESS, MeasurementUnitAction.GET_MEASUREMENT_UNITS_FAILED, LOCATION_CHANGE]);
    }
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(NormAction.getNormSuccess(response));
    }
  } else if (!response.canceled) {
    yield put(NormAction.getNormFailed(action.id));
  }
}

export function* watchGetNorm() {
  yield takeLatest(NormAction.GET_NORM, getNorm);
}

export function* saveNorm(action) {
  let sagaAction = null;
  const values = action.object.values;
  const valuesLinks = [];
  for (let i = 0; i < values.length; i += 1) {
    const newItem = ObjectUtil.cloneObject(values[i]);
    newItem.measurementUnit = ObjectUtil.getLink(values[i].measurementUnit);
    yield put(NormValueAction.saveNormValue(newItem));
    sagaAction = yield take([NormValueAction.SAVE_NORM_VALUE_SUCCESS, NormValueAction.SAVE_NORM_VALUE_FAILED]);
    if (sagaAction.type === NormValueAction.SAVE_NORM_VALUE_SUCCESS) {
      valuesLinks.push(ObjectUtil.getLink(sagaAction.data));
    } else {
      break;
    }
  }
  if (sagaAction == null || (sagaAction && sagaAction.type === NormValueAction.SAVE_NORM_VALUE_SUCCESS)) {
    const objectNorm = ObjectUtil.cloneObject(action.object);
    objectNorm.values = valuesLinks;
    const response = yield call(NormApi.saveNorm, objectNorm);
    if (response && !response.error && !response.canceled) {
      yield put(NormAction.saveNormSuccess(response));
      yield call(browserHistory.push, NormPath.NORM_LIST);
    } else if (!response.canceled) {
      const data = {
        httpStatus: response.status,
        object: action.object,
      };
      yield put(NormAction.saveNormFailed(data));
    }
  } else if (sagaAction) {
    const data = {
      httpStatus: sagaAction.data.httpStatus,
      object: action.object,
    };
    yield put(NormAction.saveNormFailed(data, false));
  }
}

export function* watchSaveNorm() {
  yield takeLatest(NormAction.SAVE_NORM, saveNorm);
}

export function* deleteNorm(action) {
  const response = yield call(NormApi.deleteNorm, action.object);
  if (response === '') {
    yield put(NormAction.deleteNormSuccess(action.object));
    yield put(NormAction.getNorms());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(NormAction.deleteNormFailed(data));
  }
}

export function* watchDeleteNorm() {
  yield takeLatest(NormAction.DELETE_NORM, deleteNorm);
}

export function* newNorm() {
  yield call(ApiCaller.cancelAllRequests);
  yield put(ServiceAction.findServicesByName());
  let sagaAction = yield take([ServiceAction.GET_SERVICES_SUCCESS, ServiceAction.GET_SERVICES_FAILED, LOCATION_CHANGE]);
  if (sagaAction.type !== LOCATION_CHANGE) {
    yield put(MeasurementUnitAction.findMeasurementUnitsByName());
    sagaAction = yield take([MeasurementUnitAction.GET_MEASUREMENT_UNITS_SUCCESS, MeasurementUnitAction.GET_MEASUREMENT_UNITS_FAILED, LOCATION_CHANGE]);
  }
}

export function* watchNewNorm() {
  yield takeLatest(NormAction.NEW_NORM, newNorm);
}

// find
export function* findNormsByName(action) {
  const response = yield call(NormApi.findNormsByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(NormAction.getNormsSuccess(response));
  } else if (!response.canceled) {
    yield put(NormAction.getNormsFailed());
  }
}
export function* findNormsByServiceId(action) {
  const response = yield call(NormApi.findNormsByServiceId, action.serviceId);
  if (response && !response.error && !response.canceled) {
    yield put(NormAction.getNormsSuccess(response));
  } else if (!response.canceled) {
    yield put(NormAction.getNormsFailed());
  }
}

export function* watchFindNormsByName() {
  yield takeLatest(NormAction.FIND_NORMS_BY_NAME, findNormsByName);
}
export function* watchFindNormsByServiceId() {
  yield takeLatest(NormAction.FIND_NORMS_BY_SERVICE_ID, findNormsByServiceId);
}

export const rootNormSaga = [
  fork(watchGetNorms),
  fork(watchGetNorm),
  fork(watchSaveNorm),
  fork(watchDeleteNorm),
  fork(watchNewNorm),
  fork(watchFindNormsByName),
  fork(watchFindNormsByServiceId),
];
