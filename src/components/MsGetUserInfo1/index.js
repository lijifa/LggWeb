import React, { Component } from 'react'
import { connect } from 'dva';
import { Input, message, Spin } from "antd";
const Search = Input.Search;

const namespace = 'employee';

@connect(({ employee, loading }) => ({
  loading: loading.effects['employee/detail'] ? true : false,
  result: employee.detailRes,
  result2: employee.detailTempRes
}))
export default class MsGetUserInfo1 extends Component {

  /* 列表初始化 */
  getUserInfo(val) {
    if (!val) {
      return;
    }
    const { dispatch, onChange, detailType } = this.props;
    let resUrl = detailType ? 'employee/detailTemp' : 'employee/detail'
    dispatch({
      type: resUrl,
      payload: {
        userMapId: val,
        acctType: 0,
      },
    }).then(() => {
      if (detailType) {
        if(this.props.result2){
          onChange(this.props.result2)
        } else {
          message.info('未找到相关信息')
        }
      }else{
        if(this.props.result){
          onChange(this.props.result)
        } else {
          message.info('未找到相关信息')
        }
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