import request from '@/utils/request';

export async function query(params) {
  return request('/cmbc/rchg/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function batchRchgAdd(params) {
  return request('/cmbc/rchg/batchRchgAdd', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function del(params) {
  return request('/cmbc/rchg/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}