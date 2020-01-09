import request from '@/utils/request';

/* 卡片列表 */
export async function query(params) {
  return request('/cmbc/card/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

/* 卡片添加 */
export async function add(params) {
  return request('/cmbc/card/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

