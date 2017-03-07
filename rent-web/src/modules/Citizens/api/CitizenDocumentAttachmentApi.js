import * as ApiCaller from '../../../util/ApiCaller';

export function getCitizenDocumentAttachments(page = 0) {
  return ApiCaller.callApi(`citizen-document-attachment?page=${page}&sort=name`);
}

export function getCitizenDocumentAttachment(id) {
  return ApiCaller.callApi(`citizen-document-attachment/${id}?projection=citizenDocumentAttachmentBasic`);
}

export function saveCitizenDocumentAttachment(object) {
  return ApiCaller.callApi('citizen-document-attachment', 'post', object);
}

export function deleteCitizenDocumentAttachment(object) {
  return ApiCaller.callApi(`citizen-document-attachment/${object.id}`, 'delete');
}
