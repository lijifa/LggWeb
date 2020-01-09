import request from '@/utils/request';

export async function query(params) {
  return request('/cmbc/feed/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function add(params) {
  return request('/cmbc/feed/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function update(params) {
  return request('/cmbc/feed/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function del(params) {
  return request('/cmbc/feed/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function exportFeed(params) {
  return request('/cmbc/feed/exportFeed', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}