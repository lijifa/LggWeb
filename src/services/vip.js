import request from '@/utils/request';

export async function query(params) {
  return request('/admin/vip/query', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function add(params) {
  return request('/admin/vip/add', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function update(params) {
  return request('/admin/vip/edit', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function del(params) {
  return request('/admin/vip/del', {
    method: 'POST',
    body: {
      ...params
    },
  });
}