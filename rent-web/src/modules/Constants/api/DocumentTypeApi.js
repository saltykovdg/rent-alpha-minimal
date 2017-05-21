import * as ApiCaller from '../../../util/ApiCaller';

export function getDocumentTypes(page = 0) {
  return ApiCaller.callApi(`document-type?page=${page}&sort=name&projection=documentTypeMinimal`);
}

export function getDocumentType(id) {
  return ApiCaller.callApi(`document-type/${id}?projection=documentTypeBasic`);
}

export function saveDocumentType(object) {
  return ApiCaller.callApi('document-type', 'post', object);
}

export function deleteDocumentType(object) {
  return ApiCaller.callApi(`document-type/${object.id}`, 'delete');
}

export function findDocumentTypesByName(name = '') {
  return ApiCaller.callApi(`document-type/search/findByNameContainingOrderByName?name=${name}&projection=documentTypeMinimal`);
}
