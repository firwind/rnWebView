import { ServicePrefix } from '../constant';

async function fetchService(url, setting = {
  headers: {},
}) {
  const reqSetting = {
    ...setting,
    headers: {
      ...setting.headers,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
  };
  const resp = await fetch(
    `${ServicePrefix}/${url}`,
    reqSetting,
  );
  console.log('====================================');
  console.log('adfdfsdf');
  console.log('====================================');
  if (!resp.ok) {
    const error = new Error(`${url} is not OK!`);
    error.code = resp.status;
    error.text = resp.statusText;
    throw error;
  }
  return resp;
}

export async function getText(url) {
  const resp = await fetch(`${ServicePrefix}/${url}`);
  if (!resp.ok) {
    throw Error(`request ${url} failed! ${resp.status} - ${resp.statusText}`);
  }
  return resp.text();
}

export async function getJSON(url, data, setting) {
  const resp = await fetchService(url, {
    ...setting,
    method: 'GET',
  });
  return resp.json();
}

export async function postJSON(url, data, setting) {
  const resp = await fetchService(url, {
    ...setting,
    method: 'POST',
    body: data,
  });
  console.log('====================================');
  console.log('adfdfsdf');
  console.log('====================================');
  return resp.json();
}

export async function head(url, headerKeys) {
  const resp = await fetchService(url, {
    method: 'HEAD',
    header: {
      Etag: '',
    },
  });
  const { headers } = resp;
  return headerKeys.map(key => headers.get(key));
}

