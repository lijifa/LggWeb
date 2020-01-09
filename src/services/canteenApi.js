import request from '@/utils/request';

export async function menuQuery(params) {
  return request('/cmbc/menunotice/queryAll', {
    method: 'POST',
    body: params,
  });
}
export async function menuQueryWeek(params) {
  return request('/cmbc/menunotice/queryWeek', {
    method: 'POST',
    body: params,
  });
}

export async function menuQueryToday(params) {
  return request('/cmbc/menunotice/queryToday', {
    method: 'POST',
    body: params,
  });
}

export async function menuAdd(params) {
  return request('/cmbc/menunotice/add', {
    method: 'POST',
    body: params,
  });
}

export async function menuUpdate(params) {
  return request('/cmbc/menunotice/update', {
    method: 'POST',
    body: params,
  });
}

export async function saleQuery(params) {
  return request('/cmbc/sale/queryRecord', {
    method: 'POST',
    body: params,
  });
}

export async function notice(params) {
  return request('/cmbc/notice/queryAllNotice', {
    method: 'POST',
    body: params,
  });
}

export async function queryDetailList(params) {
  return request('/cmbc/menunotice/queryAllDetail', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function sendEmail(params) {
  return request('/cmbc/sale/generateMealRecordAndSendEmail', {
    method: 'POST',
    body: params,
  });
}
// 验证密码
export async function checkPassword(params) {
  return request('/cmbc/auth/login', {
    method: 'POST',
    body: params,
  });
}