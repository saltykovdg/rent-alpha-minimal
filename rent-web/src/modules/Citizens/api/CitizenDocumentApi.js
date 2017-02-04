import * as ApiCaller from '../../../util/ApiCaller';

export function getCitizenDocuments(page = 0) {
  return ApiCaller.callApi(`citizen-document?page=${page}`);
}

export function getCitizenDocument(id) {
  return ApiCaller.callApi(`citizen-document/${id}?projection=citizenDocumentBasic`);
}

export function saveCitizenDocument(object) {
  return ApiCaller.callApi('citizen-document', 'post', object);
}

export function deleteCitizenDocument(object) {
  return ApiCaller.callApi(`citizen-document/${object.id}`, 'delete');
}
