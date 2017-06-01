import axios from 'axios';

let sources = [];

const ignoreCancelRequests = [
  'working-period',
  'system-property',
  'calculation/calculate-account',
  'calculation/calculate-accounts',
  'calculation/close-working-period',
];

export function cancelAllRequests() {
  const removed = [];
  sources.forEach((item) => {
    let ignore = false;
    ignoreCancelRequests.forEach((ignoreItem) => {
      if (item.endpoint.includes(ignoreItem)) {
        ignore = true;
      }
    });
    if (!ignore) {
      item.source.cancel();
      removed.push(item.endpoint);
    }
  });
  sources = sources.filter(source => !removed.includes(source.endpoint));
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export function callApi(endpoint, method = 'get', body, responseType = '') {
  cancelAllRequests();

  const cancelToken = axios.CancelToken;
  const currentSource = { source: cancelToken.source(), endpoint };
  sources.push(currentSource);

  return axios({
    method,
    url: `${process.env.RENT_API_URL}/${endpoint}`,
    data: body,
    withCredentials: true,
    auth: {
      username: 'admin',
      password: 'admin',
    },
    cancelToken: currentSource.token,
    responseType,
  })
  .then((response) => {
    if (responseType === 'arraybuffer') {
      let fileName = response.headers['content-file-name'];
      if (!fileName) {
        if (endpoint.indexOf(`${process.env.RENT_API_CONTENT_URL}`) !== -1) {
          fileName = endpoint.replace(`${process.env.RENT_API_CONTENT_URL}/`, '');
        } else {
          fileName = guid();
        }
      }
      const contentType = response.headers['content-type'];
      const blob = new Blob([response.data], { type: contentType });
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, fileName);
      } else {
        window.URL = window.URL || window.webkitURL;
        const blobUrl = window.URL.createObjectURL(blob);
        window.open(blobUrl);
      }
    }
    return response.data;
  })
  .catch((thrown) => {
    if (axios.isCancel(thrown)) {
      return { canceled: true, status: 'canceled' };
    }
    const status = thrown && thrown.response && thrown.response.status ? thrown.response.status : 'unknown';
    return { error: thrown, status };
  });
}

export function uploadFile(object) {
  return callApi('file/upload', 'post', object);
}

export function downloadFile(endpoint, method) {
  return callApi(endpoint, method, null, 'arraybuffer');
}
