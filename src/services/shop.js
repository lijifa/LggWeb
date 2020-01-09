import request from '@/utils/request';

export async function query(params) {
  return request('/cmbc/shop/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function queryAll(params) {
  return request('/cmbc/shop/queryAll', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function edit(params) {
  return request('/cmbc/shop/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function add(params) {
  return request('/cmbc/shop/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

