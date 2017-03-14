import * as ApiCaller from '../../../util/ApiCaller';

export function getAccountRegisteredDocumentAttachments(page = 0) {
  return ApiCaller.callApi(`account-registered-document-attachment?page=${page}&sort=name`);
}

export function getAccountRegisteredDocumentAttachment(id) {
  return ApiCaller.callApi(`account-registered-document-attachment/${id}?projection=accountRegisteredDocumentAttachmentBasic`);
}

export function saveAccountRegisteredDocumentAttachment(object) {
  return ApiCaller.callApi('account-registered-document-attachment', 'post', object);
}

export function deleteAccountRegisteredDocumentAttachment(object) {
  return ApiCaller.callApi(`account-registered-document-attachment/${object.id}`, 'delete');
}
