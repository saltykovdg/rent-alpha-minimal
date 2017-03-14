import * as ApiCaller from '../../../util/ApiCaller';

export function getAccountOwnerDocumentAttachments(page = 0) {
  return ApiCaller.callApi(`account-owner-document-attachment?page=${page}&sort=name`);
}

export function getAccountOwnerDocumentAttachment(id) {
  return ApiCaller.callApi(`account-owner-document-attachment/${id}?projection=accountOwnerDocumentAttachmentBasic`);
}

export function saveAccountOwnerDocumentAttachment(object) {
  return ApiCaller.callApi('account-owner-document-attachment', 'post', object);
}

export function deleteAccountOwnerDocumentAttachment(object) {
  return ApiCaller.callApi(`account-owner-document-attachment/${object.id}`, 'delete');
}
