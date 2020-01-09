import request from '@/utils/request';

export async function query() {
  return request('/admin/user/query');
}

export async function add() {
  return request('/admin/user/add');
}

export async function edit() {
  return request('/admin/user/update');
}

export async function del() {
  return request('/admin/user/del');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
