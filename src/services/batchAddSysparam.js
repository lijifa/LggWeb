import request from '@/utils/request';

export async function query(params) {
  return request('/cmbc/sysparam/queryAll', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function update(params) {
  return request('/cmbc/sysparam/batchAddSysparam', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}