import request from '@/utils/request';

export async function query(params) {
  return request('/cmbc/rolemodule/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function add(params) {
  return request('/cmbc/rolemodule/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}
