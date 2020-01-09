import request from '@/utils/request';

export async function query(params) {
  return request('/cmbc/dept/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function queryAll(params) {
  return request('/cmbc/dept/queryAll', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}
export async function edit(params) {
  return request('/cmbc/dept/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function add(params) {
  return request('/cmbc/dept/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}