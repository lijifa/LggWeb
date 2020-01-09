import request from '@/utils/request';

export async function queryAll(params) {
  return request('/cmbc/menu/queryAll', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function queryByRole(params) {
  return request('/cmbc/role/detail', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}
