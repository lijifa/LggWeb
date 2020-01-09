import request from '@/utils/request';

export async function query(params) {
  return request('/admin/rule/query', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function add(params) {
  return request('/admin/rule/add', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function update(params) {
  return request('/admin/rule/edit', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function del(params) {
  return request('/admin/rule/del', {
    method: 'POST',
    body: {
      ...params
    },
  });
}