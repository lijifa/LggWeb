import React, { Component } from 'react'
import { connect } from 'dva';
import { Select, Spin } from 'antd'
const { Option } = Select

const namespace = 'shop';

@connect(({ shop, loading }) => ({
  result: shop.selectData,
  loading: loading.effects['shop/queryAll'] ? true : false,
}))
export default class MsShopSelect extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.searchList()
  }

  /* 列表初始化 */
  searchList() {
    const { dispatch, shopType } = this.props;
    const param = shopType ? {shopType: shopType} : '';
    dispatch({
      type: `${namespace}/queryAll`,
      payload: param
    });
  }

  render() {
    const {result, loading, ...others} = this.props
    let options = result ? result.data : []
    if(options  === undefined || options.length==0)  {
      options = []
    }

    return(
      <Spin spinning={loading}>
        <Select {...this.props} allowClear={true}>
          {
            options.map( (item) => {
              return <Option value={item.shopMapId} key={item.shopMapId} >{item.shopName} </Option>
            })
          }
        </Select>
      </Spin>
    )
  }
}