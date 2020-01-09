import request from '@/utils/request';

export async function query(params) {
  return request('/cmbc/org/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function queryAll(params) {
  return request('/cmbc/org/queryAll', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function edit(params) {
  return request('/cmbc/org/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function add(params) {
  return request('/cmbc/org/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

