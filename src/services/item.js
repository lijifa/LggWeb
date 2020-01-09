import request from '@/utils/request';

export async function query(params) {
  return request('/cmbc/item/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function queryAllMer(params) {
  return request('/cmbc/item/queryAllMer', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function add(params) {
  return request('/cmbc/item/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function update(params) {
  return request('/cmbc/item/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function del(params) {
  return request('/cmbc/item/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}