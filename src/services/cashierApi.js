import request from '@/utils/request';

//获取分类列表
export async function querySkugrp(params) {
  return request('/cmbc/skugrp/queryAll', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

//获取商品列表（废弃）
export async function queryShopitem(params) {
  return request('/cmbc/shopitem/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

//获取商品列表（分页）
export async function queryItemList(params) {
  return request('/cmbc/item/queryItemList', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

//提交订单
export async function addSaleOrder(params) {
  return request('/cmbc/sale/addSaleOrder', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

//完成订单
export async function completeSaleOrder(params) {
  return request('/cmbc/sale/completeSaleOrder', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

//获取代理领导列表
export async function getManagerList(params) {
  return request('/cmbc/usermanager/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

//获取洗衣列表
export async function getWashcloth(params) {
  return request('/cmbc/washcloth/query', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

//设置取衣
export async function washclothUpdate(params) {
  return request('/cmbc/washcloth/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}
