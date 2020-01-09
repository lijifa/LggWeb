import React, { Component } from 'react'
import { connect } from 'dva';
import { Input, Spin } from 'antd'
const Search = Input.Search;

const namespace = 'employee';

@connect(({ employee, loading }) => ({
  loading: loading.effects['employee/detail'] ? true : false,
}))
export default class MsGetUserInfo extends Component {

  /* 列表初始化 */
  getUserInfo(val) {
    if (!val) {
      return;
    }
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}/detail`,
      payload: {
        userMapId: val,
        acctType: 0,
      }
    });
  }

  render() {
    const {loading, ...others} = this.props
    
    return(
      <Spin spinning={loading}>
        <Search
          placeholder="请输入工号"
          enterButton="读取"
          onSearch={value => this.getUserInfo(value)}
        />
      </Spin>
    )
  }
}