import React, { Component } from 'react'
import { connect } from 'dva';
import { Input, Spin } from 'antd'
const Search = Input.Search;

const namespace = 'card';
const mapStateToProps = (state) => {
  const result = state[namespace];
  return {
    result
  };
};

@connect(mapStateToProps)
export default class MsGetUserInfo extends Component {
  state = {
    formValues: {},
    detailData: null,
    loading: false,
  };

  /* 列表初始化 */
  getCardInfo(val) {
    if (!val) {
      return;
    }
    this.setState({
      loading: true
    })
    const { dispatch } = this.props;
    console.log(val)
    dispatch({
      type: `${namespace}/search`,
      payload: {
        cardNo: val,
      }
    });
  }

  render() {
    const { loading } = this.state
    return(
      //<Spin spinning={loading}>
        <Search
          placeholder="请输入卡号"
          enterButton="读取"
          onSearch={
              value => this.getCardInfo(value)
            }
        />
     // </Spin>
    )
  }
}