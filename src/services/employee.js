import request from '@/utils/request';

export async function query(params) {
  return request('/cmbc/user/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function edit(params) {
  return request('/cmbc/user/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function add(params) {
  return request('/cmbc/user/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function detail(params) {
  return request('/cmbc/user/detail', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

// 临时卡授权-临时卡用户详情
export async function detailTemp(params) {
  return request('/cmbc/user/tempapplyUserDetail', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

// 查询全部员工
export async function queryAll(params) {
  return request('/cmbc/user/queryAll', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

// 添加领导
export async function addManage(params) {
  return request('/cmbc/usermanager/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function read(params) {
  return request('http://localhost', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function changeCardNo(params) {
  return request('/cmbc/card/changeCardNo', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}