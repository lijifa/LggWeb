import request from '@/utils/request';

//消费流水
export async function query(params) {
  return request('/cmbc/sale/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
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

//消费统计报表
export async function queryAllSda(params) {
  return request('/cmbc/shopsta/queryAllSda', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

//充值统计报表
export async function queryAllDeptda(params) {
  return request('/cmbc/deptDt/queryAllDeptda', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function exportSale(params) {
  return request('/cmbc/sale/exportSale', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function del(params) {
  return request('/cmbc/sale/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}