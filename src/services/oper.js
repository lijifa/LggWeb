import request from '@/utils/request';

export async function query(params) {
  return request('/cmbc/oper/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function add(params) {
  return request('/cmbc/oper/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function update(params) {
  return request('/cmbc/oper/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function del(params) {
  return request('/cmbc/oper/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}