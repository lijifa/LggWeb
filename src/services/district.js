import request from '@/utils/request';

export async function query(params) {
  return request('/cmbc/district/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function queryAll(params) {
  return request('/cmbc/district/queryAll', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function edit(params) {
  return request('/cmbc/district/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function add(params) {
  return request('/cmbc/district/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}