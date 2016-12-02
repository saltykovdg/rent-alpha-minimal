import axios from 'axios';

let sources = [];

export function cancelAllRequests() {
  sources.forEach((source) => {
    source.cancel();
  });
  sources = [];
}

export function callApi(endpoint, method = 'get', body) {
  cancelAllRequests();

  const cancelToken = axios.CancelToken;
  const currentSource = cancelToken.source();
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
