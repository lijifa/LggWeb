import request from '@/utils/request';

//历史订单查询列表
export async function query(params) {
  return request('/cmbc/sale/queryHistory', {
    method: 'POST',
    body: params,
  });
}

//订单详情
export async function detail(params) {
  return request('/cmbc/sale/detail', {
    method: 'POST',
    body: params,
  });
}

//消费撤销
export async function update(params) {
  return request('/cmbc/sale/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

//取衣通知
export async function washclothState(params) {
  return request('/cmbc/washcloth/clothToBeTaken', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

//洗衣记录发邮件
export async function washclothSendMail(params) {
  return request('/cmbc/sale/generateWashClothRecordAndSendEmail', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}