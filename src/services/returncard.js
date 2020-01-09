import request from '@/utils/request';

export async function query(params) {
  return request('/cmbc/returncard/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function queryAll(params) {
  return request('/cmbc/returncard/queryAll', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}
export async function update(params) {
  return request('/cmbc/returncard/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function add(params) {
  return request('/cmbc/returncard/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function del(params) {
  return request('/cmbc/returncard/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}