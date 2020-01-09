import request from '@/utils/request';

export async function query(params) {
  return request('/cmbc/skutag/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function queryAll(params) {
  return request('/cmbc/skutag/queryAll', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}
  
export async function add(params) {
  return request('/cmbc/skutag/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function update(params) {
  return request('/cmbc/skutag/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function del(params) {
  return request('/cmbc/skutag/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}