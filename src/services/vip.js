import request from '@/utils/request';

export async function query() {
  return request('/admin/vip/query');
}

export async function add() {
  return request('/admin/vip/add');
}

export async function edit() {
  return request('/admin/vip/update');
}

export async function del() {
  return request('/admin/vip/del');
}
