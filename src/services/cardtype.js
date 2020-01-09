import request from '@/utils/request';

export async function query(params) {
  return request('/cmbc/cardtype/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function queryAll(params) {
  return request('/cmbc/cardtype/queryAll', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}
export async function update(params) {
  return request('/cmbc/cardtype/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function add(params) {
  return request('/cmbc/cardtype/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function del(params) {
  return request('/cmbc/cardtype/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}