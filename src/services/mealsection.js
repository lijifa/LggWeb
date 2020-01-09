import request from '@/utils/request';

export async function query(params) {
  return request('/cmbc/mealsection/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function update(params) {
  return request('/cmbc/mealsection/updateBatch', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}