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

export function callApi(endpoint, method = 'get', body) {
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
  })
  .then((response) => {
    const data = response.data;
    if (data && data.content && data.content.length === 1) {
      if (!data.content[0].id) {
        data.content = [];
      }
    }
    return data;
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
