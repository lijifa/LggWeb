import request from '@/utils/request';

export async function query(params) {
  return request('/admin/order/query', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function add(params) {
  return request('/admin/order/add', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function update(params) {
  return request('/admin/order/edit', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function del(params) {
  return request('/admin/order/del', {
    method: 'POST',
    body: {
      ...params
    },
  });
}