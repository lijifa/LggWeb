import request from '@/utils/request';

export async function query(params) {
  return request('/admin/question_type/query', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function queryAll(params) {
  return request('/admin/question_type/queryAll', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function add(params) {
  return request('/admin/question_type/add', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function edit(params) {
  return request('/admin/question_type/edit', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function del(params) {
  return request('/admin/question_type/del', {
    method: 'POST',
    body: {
      ...params
    },
  });
}