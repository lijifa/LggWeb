import request from '@/utils/request';

export async function query(params) {
  return request('/admin/user/query', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function add(params) {
  return request('/admin/user/add', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function update(params) {
  return request('/admin/user/edit', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function del(params) {
  return request('/admin/user/del', {
    method: 'POST',
    body: {
      ...params
    },
  });
}