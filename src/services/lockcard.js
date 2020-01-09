import request from '@/utils/request';

/* 挂失列表 */
export async function lockcardQuery(params) {
  return request('/cmbc/lockcard/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

/* 挂失操作 */
export async function lockcard(params) {
  return request('/cmbc/lockcard/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

/* 解挂操作 */
export async function unlockcard(params) {
  return request('/cmbc/lockcard/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}