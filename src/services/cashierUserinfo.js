import request from '@/utils/request';

export async function userinfo(params) {
  return request('/cmbc/user/detail', {
    method: 'POST',
    body: params,
  });
}

export async function userLogout(params) {
  return request('/cmbc/auth/logout', {
    method: 'POST',
    body: params,
  });
}