import request from '@/utils/request';

export async function query(params) {
  return request('/cmbc/mer/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function queryAll(params) {
  return request('/cmbc/mer/queryAll', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function edit(params) {
  return request('/cmbc/mer/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function add(params) {
  return request('/cmbc/mer/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}