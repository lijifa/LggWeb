import request from '@/utils/request';

export async function query(params) {
  return request('/admin/question/query', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function add(params) {
  return request('/admin/question/add', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function update(params) {
  return request('/admin/question/edit', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function del(params) {
  return request('/admin/question/del', {
    method: 'POST',
    body: {
      ...params
    },
  });
}