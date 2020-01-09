import request from '@/utils/request';

export async function query(params) {
  return request('/cmbc/menunotice/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function update(params) {
  return request('/cmbc/menunotice/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function batchUpdate(params) {
  return request('/cmbc/menunotice/batchUpdate', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function detail(params) {
  return request('/cmbc/menunotice/detail', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function queryDetailList(params) {
  return request('/cmbc/menunotice/queryAllDetail', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}