export const DOWNLOAD_CONTENT = 'DOWNLOAD_CONTENT';
export const DOWNLOAD_CONTENT_SUCCESS = 'DOWNLOAD_CONTENT_SUCCESS';
export const DOWNLOAD_CONTENT_FAILED = 'DOWNLOAD_CONTENT_FAILED';

export const downloadContent = (url) => {
  return {
    type: DOWNLOAD_CONTENT,
    url,
  };
};
export const downloadContentSuccess = () => {
  return {
    type: DOWNLOAD_CONTENT_SUCCESS,
  };
};
export const downloadContentFailed = () => {
  return {
    type: DOWNLOAD_CONTENT_FAILED,
  };
};
