import { call, put, fork, take, takeLatest } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';

import * as AddressAction from './AddressActions';
import * as BuildingMeterAction from './actions/BuildingMeterAction';
import * as AddressApi from './AddressApi';
import * as AddressPath from './AddressPaths';
import * as ApiCaller from '../../util/ApiCaller';
import * as ObjectUtil from './../../util/ObjectUtil';

import { rootBuildingMeterSaga } from './sagas/BuildingMeterSaga';

// get lists
export function* getStreetTypes(action) {
  const response = yield call(AddressApi.getStreetTypes, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(AddressAction.getStreetTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(AddressAction.getStreetTypesFailed());
  }
}
export function* getStreets(action) {
  const response = yield call(AddressApi.getStreets, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(AddressAction.getStreetsSuccess(response));
  } else if (!response.canceled) {
    yield put(AddressAction.getStreetsFailed());
  }
}
export function* getBuildings(action) {
  const response = yield call(AddressApi.getBuildings, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(AddressAction.getBuildingsSuccess(response));
  } else if (!response.canceled) {
    yield put(AddressAction.getBuildingsFailed());
  }
}
export function* getApartments(action) {
  const response = yield call(AddressApi.getApartments, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(AddressAction.getApartmentsSuccess(response));
  } else if (!response.canceled) {
    yield put(AddressAction.getApartmentsFailed());
  }
}

export function* watchGetStreetTypes() {
  yield takeLatest(AddressAction.GET_STREET_TYPES, getStreetTypes);
}
export function* watchGetStreets() {
  yield takeLatest(AddressAction.GET_STREETS, getStreets);
}
export function* watchGetBuildings() {
  yield takeLatest(AddressAction.GET_BUILDINGS, getBuildings);
}
export function* watchGetApartments() {
  yield takeLatest(AddressAction.GET_APARTMENTS, getApartments);
}

// get by id
export function* getStreetType(action) {
  const response = yield call(AddressApi.getStreetType, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(AddressAction.getStreetTypeSuccess(response));
  } else if (!response.canceled) {
    yield put(AddressAction.getStreetTypeFailed(action.id));
  }
}
export function* getStreet(action) {
  const response = yield call(AddressApi.getStreet, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(AddressAction.findStreetTypesByName());
    const sagaAction = yield take([AddressAction.GET_STREET_TYPES_SUCCESS, AddressAction.GET_STREET_TYPES_FAILED, LOCATION_CHANGE]);
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(AddressAction.getStreetSuccess(response));
    }
  } else if (!response.canceled) {
    yield put(AddressAction.getStreetFailed(action.id));
  }
}
export function* getBuilding(action) {
  const response = yield call(AddressApi.getBuilding, action.id);
  if (response && !response.error && !response.canceled) {
    yield put(AddressAction.findStreetsByName());
    const sagaAction = yield take([AddressAction.GET_STREETS_SUCCESS, AddressAction.GET_STREETS_FAILED, LOCATION_CHANGE]);
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(AddressAction.getBuildingSuccess(response));
    }
  } else if (!response.canceled) {
    yield put(AddressAction.getBuildingFailed(action.id));
  }
}
export function* getApartment(action) {
  const response = yield call(AddressApi.getApartment, action.id);
  if (response && !response.error && !response.canceled) {
    let sagaAction;
    yield put(AddressAction.findStreetsByName());
    sagaAction = yield take([AddressAction.GET_STREETS_SUCCESS, AddressAction.GET_STREETS_FAILED, LOCATION_CHANGE]);
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(AddressAction.findBuildingsByStreetId(response.building.street.id));
      sagaAction = yield take([AddressAction.GET_BUILDINGS_SUCCESS, AddressAction.GET_BUILDINGS_FAILED, LOCATION_CHANGE]);
    }
    if (sagaAction.type !== LOCATION_CHANGE) {
      yield put(AddressAction.getApartmentSuccess(response));
    }
  } else if (!response.canceled) {
    yield put(AddressAction.getApartmentFailed(action.id));
  }
}

export function* watchGetStreetType() {
  yield takeLatest(AddressAction.GET_STREET_TYPE, getStreetType);
}
export function* watchGetStreet() {
  yield takeLatest(AddressAction.GET_STREET, getStreet);
}
export function* watchGetBuilding() {
  yield takeLatest(AddressAction.GET_BUILDING, getBuilding);
}
export function* watchGetApartment() {
  yield takeLatest(AddressAction.GET_APARTMENT, getApartment);
}

// save
export function* saveStreetType(action) {
  const response = yield call(AddressApi.saveStreetType, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(AddressAction.saveStreetTypeSuccess(response));
    yield call(browserHistory.push, AddressPath.STREET_TYPE_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AddressAction.saveStreetTypeFailed(data));
  }
}
export function* saveStreet(action) {
  const response = yield call(AddressApi.saveStreet, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(AddressAction.saveStreetSuccess(response));
    yield call(browserHistory.push, AddressPath.STREET_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AddressAction.saveStreetFailed(data));
  }
}
export function* saveBuilding(action) {
  let sagaAction = null;
  const meters = action.object.meters;
  const metersLinks = [];

  // save meters
  for (let i = 0; i < meters.length; i += 1) {
    sagaAction = null;
    const meterObj = ObjectUtil.cloneObject(meters[i]);
    meterObj.meter = ObjectUtil.getLink(meters[i].meter);

    // save meter
    if (sagaAction == null) {
      yield put(BuildingMeterAction.saveBuildingMeter(meterObj));
      sagaAction = yield take([BuildingMeterAction.SAVE_BUILDING_METER_SUCCESS, BuildingMeterAction.SAVE_BUILDING_METER_FAILED]);
      if (sagaAction.type === BuildingMeterAction.SAVE_BUILDING_METER_SUCCESS) {
        metersLinks.push(ObjectUtil.getLink(sagaAction.data));
        sagaAction = null;
      } else {
        break;
      }
    }
  }

  // save building
  if (sagaAction == null) {
    const objectBuilding = ObjectUtil.cloneObject(action.object);
    objectBuilding.meters = metersLinks;
    const response = yield call(AddressApi.saveBuilding, objectBuilding);
    if (response && !response.error && !response.canceled) {
      yield put(AddressAction.saveBuildingSuccess(response));
      yield call(browserHistory.push, AddressPath.BUILDING_LIST);
    } else if (!response.canceled) {
      const data = {
        httpStatus: response.status,
        object: action.object,
      };
      yield put(AddressAction.saveBuildingFailed(data));
    }
  } else if (sagaAction) {
    const data = {
      httpStatus: sagaAction.data.httpStatus,
      object: action.object,
    };
    yield put(AddressAction.saveBuildingFailed(data));
  }
}
export function* saveApartment(action) {
  const response = yield call(AddressApi.saveApartment, action.object);
  if (response && !response.error && !response.canceled) {
    yield put(AddressAction.saveApartmentSuccess(response));
    yield call(browserHistory.push, AddressPath.APARTMENT_LIST);
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AddressAction.saveApartmentFailed(data));
  }
}

export function* watchSaveStreetType() {
  yield takeLatest(AddressAction.SAVE_STREET_TYPE, saveStreetType);
}
export function* watchSaveStreet() {
  yield takeLatest(AddressAction.SAVE_STREET, saveStreet);
}
export function* watchSaveBuilding() {
  yield takeLatest(AddressAction.SAVE_BUILDING, saveBuilding);
}
export function* watchSaveApartment() {
  yield takeLatest(AddressAction.SAVE_APARTMENT, saveApartment);
}

// delete
export function* deleteStreetType(action) {
  const response = yield call(AddressApi.deleteStreetType, action.object);
  if (response === '') {
    yield put(AddressAction.deleteStreetTypeSuccess(action.object));
    yield put(AddressAction.getStreetTypes());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AddressAction.deleteStreetTypeFailed(data));
  }
}
export function* deleteStreet(action) {
  const response = yield call(AddressApi.deleteStreet, action.object);
  if (response === '') {
    yield put(AddressAction.deleteStreetSuccess(action.object));
    yield put(AddressAction.getStreets());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AddressAction.deleteStreetFailed(data));
  }
}
export function* deleteBuilding(action) {
  const response = yield call(AddressApi.deleteBuilding, action.object);
  if (response === '') {
    yield put(AddressAction.deleteBuildingSuccess(action.object));
    yield put(AddressAction.getBuildings());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AddressAction.deleteBuildingFailed(data));
  }
}
export function* deleteApartment(action) {
  const response = yield call(AddressApi.deleteApartment, action.object);
  if (response === '') {
    yield put(AddressAction.deleteApartmentSuccess(action.object));
    yield put(AddressAction.getApartments());
  } else if (!response.canceled) {
    const data = {
      httpStatus: response.status,
      object: action.object,
    };
    yield put(AddressAction.deleteApartmentFailed(data));
  }
}

export function* watchDeleteStreetType() {
  yield takeLatest(AddressAction.DELETE_STREET_TYPE, deleteStreetType);
}
export function* watchDeleteStreet() {
  yield takeLatest(AddressAction.DELETE_STREET, deleteStreet);
}
export function* watchDeleteBuilding() {
  yield takeLatest(AddressAction.DELETE_BUILDING, deleteBuilding);
}
export function* watchDeleteApartment() {
  yield takeLatest(AddressAction.DELETE_APARTMENT, deleteApartment);
}

// new record
export function* newStreetType() {
  yield call(ApiCaller.cancelAllRequests);
}
export function* newStreet() {
  yield call(ApiCaller.cancelAllRequests);
  yield put(AddressAction.findStreetTypesByName());
}
export function* newBuilding() {
  yield call(ApiCaller.cancelAllRequests);
  yield put(AddressAction.findStreetsByName());
}
export function* newApartment() {
  yield call(ApiCaller.cancelAllRequests);
  yield put(AddressAction.newBuilding());
}

export function* watchNewStreetType() {
  yield takeLatest(AddressAction.NEW_STREET_TYPE, newStreetType);
}
export function* watchNewStreet() {
  yield takeLatest(AddressAction.NEW_STREET, newStreet);
}
export function* watchNewBuilding() {
  yield takeLatest(AddressAction.NEW_BUILDING, newBuilding);
}
export function* watchNewApartment() {
  yield takeLatest(AddressAction.NEW_APARTMENT, newApartment);
}

// find
export function* findStreetTypesByName(action) {
  const response = yield call(AddressApi.findStreetTypesByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(AddressAction.getStreetTypesSuccess(response));
  } else if (!response.canceled) {
    yield put(AddressAction.getStreetTypesFailed());
  }
}
export function* findStreets(action) {
  const response = yield call(AddressApi.findStreets, action.streetType, action.name, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(AddressAction.getStreetsSuccess(response));
  } else if (!response.canceled) {
    yield put(AddressAction.getStreetsFailed());
  }
}
export function* findStreetsByName(action) {
  const response = yield call(AddressApi.findStreetsByName, action.name);
  if (response && !response.error && !response.canceled) {
    yield put(AddressAction.getStreetsSuccess(response));
  } else if (!response.canceled) {
    yield put(AddressAction.getStreetsFailed());
  }
}
export function* findBuildingsByStreetId(action) {
  const response = yield call(AddressApi.findBuildingsByStreetId, action.streetId);
  if (response && !response.error && !response.canceled) {
    yield put(AddressAction.getBuildingsSuccess(response));
  } else if (!response.canceled) {
    yield put(AddressAction.getBuildingsFailed());
  }
}
export function* findBuildings(action) {
  const response = yield call(AddressApi.findBuildings, action.street, action.house, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(AddressAction.getBuildingsSuccess(response));
  } else if (!response.canceled) {
    yield put(AddressAction.getBuildingsFailed());
  }
}
export function* findApartmentsByBuildingId(action) {
  const response = yield call(AddressApi.findApartmentsByBuildingId, action.buildingId);
  if (response && !response.error && !response.canceled) {
    yield put(AddressAction.getApartmentsSuccess(response));
  } else if (!response.canceled) {
    yield put(AddressAction.getApartmentsFailed());
  }
}
export function* findApartments(action) {
  const response = yield call(AddressApi.findApartments, action.street, action.house, action.apartment, action.page);
  if (response && !response.error && !response.canceled) {
    yield put(AddressAction.getApartmentsSuccess(response));
  } else if (!response.canceled) {
    yield put(AddressAction.getApartmentsFailed());
  }
}

export function* watchFindStreetTypesByName() {
  yield takeLatest(AddressAction.FIND_STREET_TYPES_BY_NAME, findStreetTypesByName);
}
export function* watchFindStreets() {
  yield takeLatest(AddressAction.FIND_STREETS, findStreets);
}
export function* watchFindStreetsByName() {
  yield takeLatest(AddressAction.FIND_STREETS_BY_NAME, findStreetsByName);
}
export function* watchFindBuildingsByStreetId() {
  yield takeLatest(AddressAction.FIND_BUILDINGS_BY_STREET_ID, findBuildingsByStreetId);
}
export function* watchFindBuildings() {
  yield takeLatest(AddressAction.FIND_BUILDINGS, findBuildings);
}
export function* watchFindApartmentsByBuildingId() {
  yield takeLatest(AddressAction.FIND_APARTMENTS_BY_BUILDING_ID, findApartmentsByBuildingId);
}
export function* watchFindApartments() {
  yield takeLatest(AddressAction.FIND_APARTMENTS, findApartments);
}

export const rootAddressSaga = [
  // get lists
  fork(watchGetStreetTypes),
  fork(watchGetStreets),
  fork(watchGetBuildings),
  fork(watchGetApartments),

  // get by id
  fork(watchGetStreetType),
  fork(watchGetStreet),
  fork(watchGetBuilding),
  fork(watchGetApartment),

  // save
  fork(watchSaveStreetType),
  fork(watchSaveStreet),
  fork(watchSaveBuilding),
  fork(watchSaveApartment),

  // delete
  fork(watchDeleteStreetType),
  fork(watchDeleteStreet),
  fork(watchDeleteBuilding),
  fork(watchDeleteApartment),

  // new record
  fork(watchNewStreetType),
  fork(watchNewStreet),
  fork(watchNewBuilding),
  fork(watchNewApartment),

  // find
  fork(watchFindStreetTypesByName),
  fork(watchFindStreets),
  fork(watchFindStreetsByName),
  fork(watchFindBuildingsByStreetId),
  fork(watchFindBuildings),
  fork(watchFindApartmentsByBuildingId),
  fork(watchFindApartments),

  rootBuildingMeterSaga,
];
