import request from '@/utils/request';

// export async function query() {
//   return request(`/api/employee`);
// }
// 临时卡授权-查询列表
export async function query(params) {
  return request('/cmbc/tempapply/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}
// 临时卡授权-详情
export async function detail(params) {
  return request('/cmbc/tempapply/detail', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}
// 临时卡申请记录插入并且生成二维码
export async function tempapplyBatchDeal(params) {
  return request('/cmbc/tempapply/tempapplyBatchDeal', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}
// 批量终止临时卡
export async function batchUpdate(params) {
  return request('/cmbc/userqrcode/batchUpdate', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}
// 重新发送临时卡二维码
export async function reSendEmail(params) {
  return request('/cmbc/tempapply/reSendEmail', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}