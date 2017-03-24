import { call, put, fork, take, takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';

import * as ServiceAction from './../../Services/actions/ServiceAction';
import * as CalculationTypeAction from './../../Constants/actions/CalculationTypeAction';
import * as MeasurementUnitAction from './../../Constants/actions/MeasurementUnitAction';
import * as TariffValueAction from './../actions/TariffValueAction';
import * as TariffAction from './../actions/TariffAction';
import * as TariffApi from './../api/TariffApi';
import * as TariffPath from './../paths/TariffPath';
import * as ApiCaller from '../../../util/ApiCaller';
import * as ObjectUtil from './../../../util/ObjectUtil';

export function* getTariffs(action) {
  const response = yield call(TariffApi.getTariffs, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(TariffAction.getTariffsSuccess(response));
  } else if (!response.canceled) {
    yield put(TariffAction.getTariffsFailed());
  }
}

export function* watchGetTariffs() {
  yield takeLatest(TariffAction.GET_TARIFFS, getTariffs);
}

export function* getTariff(action) {
  const response = yield call(TariffApi.getTariff, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(ServiceAction.findServicesByName());
    let sagaAction = yield take([ServiceAction.GET_SERVICES_SUCCESS, ServiceAction.GET_SERVICES_FAILED, LOCATION_CHANGE]);
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(CalculationTypeAction.findCalculationTypesByName());
      sagaAction = yield take([CalculationTypeAction.GET_CALCULATION_TYPES_SUCCESS, CalculationTypeAction.GET_CALCULATION_TYPES_FAILED, LOCATION_CHANGE]);
    }
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(MeasurementUnitAction.findMeasurementUnitsByName());
      sagaAction = yield take([MeasurementUnitAction.GET_MEASUREMENT_UNITS_SUCCESS, MeasurementUnitAction.GET_MEASUREMENT_UNITS_FAILED, LOCATION_CHANGE]);
    }
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(TariffAction.getTariffSuccess(response));
    }
  } else if (!response.canceled) {
    yield put(TariffAction.getTariffFailed(action.id));
  }
}

export function* watchGetTariff() {
  yield takeLatest(TariffAction.GET_TARIFF, getTariff);
}

export function* saveTariff(action) {
  let sagaAction = null;
  const values = action.object.values;
  const valuesLinks = [];
  for (let i = 0; i < values.length; i += 1) {
    const newItem = ObjectUtil.cloneObject(values[i]);
    newItem.calculationType = ObjectUtil.getLink(values[i].calculationType);
    newItem.measurementUnit = ObjectUtil.getLink(values[i].measurementUnit);
    yield put(TariffValueAction.saveTariffValue(newItem));
    sagaAction = yield take([TariffValueAction.SAVE_TARIFF_VALUE_SUCCESS, TariffValueAction.SAVE_TARIFF_VALUE_FAILED]);
    if (sagaAction.type === TariffValueAction.SAVE_TARIFF_VALUE_SUCCESS) {
      valuesLinks.push(ObjectUtil.getLink(sagaAction.data));
    } else {
      break;
    }
  }
  if (sagaAction == null || (sagaAction && sagaAction.type === TariffValueAction.SAVE_TARIFF_VALUE_SUCCESS)) {
    const objectTariff = ObjectUtil.cloneObject(action.object);
    objectTariff.values = valuesLinks;
    const response = yield call(TariffApi.saveTariff, objectTariff);
    if (response && !response.error && !response.canceled) {
      yield put(TariffAction.saveTariffSuccess(response));
      yield call(browserHistory.push, TariffPath.TARIFF_LIST);
    } else if (!response.canceled) {
      const data = {
        httpStatus: response.status,
        object: action.object,
      };
      yield put(TariffAction.saveTariffFailed(data));
    }
  } else if (sagaAction) {
    const data = {
      httpStatus: sagaAction.data.httpStatus,
      object: action.object,
    };
    yield put(TariffAction.saveTariffFailed(data, false));
  }
}

export function* watchSaveTariff() {
  yield takeLatest(TariffAction.SAVE_TARIFF, saveTariff);
}

export function* deleteTariff(action) {
  const response = yield call(TariffApi.deleteTariff, action.object);
  if (response === '') {
    yield put(TariffAction.deleteTariffSuccess(action.object));
    yield put(TariffAction.getTariffs());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(TariffAction.deleteTariffFailed(data));
  }
}

export function* watchDeleteTariff() {
  yield takeLatest(TariffAction.DELETE_TARIFF, deleteTariff);
}

export function* newTariff() {
  yield call(ApiCaller.cancelAllRequests);
  yield put(ServiceAction.findServicesByName());
  let sagaAction = yield take([ServiceAction.GET_SERVICES_SUCCESS, ServiceAction.GET_SERVICES_FAILED, LOCATION_CHANGE]);
  if (sagaAction.type !== LOCATION_CHANGE) {
    yield put(CalculationTypeAction.findCalculationTypesByName());
    sagaAction = yield take([CalculationTypeAction.GET_CALCULATION_TYPES_SUCCESS, CalculationTypeAction.GET_CALCULATION_TYPES_FAILED, LOCATION_CHANGE]);
  }
  if (sagaAction.type !== LOCATION_CHANGE) {
    yield put(MeasurementUnitAction.findMeasurementUnitsByName());
    sagaAction = yield take([MeasurementUnitAction.GET_MEASUREMENT_UNITS_SUCCESS, MeasurementUnitAction.GET_MEASUREMENT_UNITS_FAILED, LOCATION_CHANGE]);
  }
}

export function* watchNewTariff() {
  yield takeLatest(TariffAction.NEW_TARIFF, newTariff);
}

// find
export function* findTariffsByServiceId(action) {
  const response = yield call(TariffApi.findTariffsByServiceId, action.serviceId);
  if (response && !response.error && !response.canceled) {
    yield put(TariffAction.getTariffsSuccess(response));
  } else if (!response.canceled) {
    yield put(TariffAction.getTariffsFailed());
  }
}

export function* watchFindTariffsByServiceId() {
  yield takeLatest(TariffAction.FIND_TARIFFS_BY_SERVICE_ID, findTariffsByServiceId);
}

export const rootTariffSaga = [
  fork(watchGetTariffs),
  fork(watchGetTariff),
  fork(watchSaveTariff),
  fork(watchDeleteTariff),
  fork(watchNewTariff),
  fork(watchFindTariffsByServiceId),
];
