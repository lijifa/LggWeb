import request from '@/utils/request';

export async function query(params) {
  return request('/cmbc/msgTemplate/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function add(params) {
  return request('/cmbc/msgTemplate/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function update(params) {
  return request('/cmbc/msgTemplate/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function del(params) {
  return request('/cmbc/msgTemplate/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}