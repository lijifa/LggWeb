import request from '@/utils/request';

export async function query(params) {
  return request('/cmbc/changecard/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function queryAll(params) {
  return request('/cmbc/changecard/queryAll', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}
  
export async function add(params) {
  return request('/cmbc/changecard/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function update(params) {
  return request('/cmbc/changecard/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function del(params) {
  return request('/cmbc/changecard/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}