import React, { Component } from 'react'
import { connect } from 'dva';
import { Select, Spin } from 'antd'

const { Option } = Select
const namespace = 'questiontype';

@connect(({ questiontype, loading }) => ({
  result: questiontype.selectData,
  loading: loading.effects['questiontype/queryAll'] ? true : false,
}))
export default class MsQstypeSelect extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.searchList()
  }

  /* 列表初始化 */
  searchList() {
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}/queryAll`,
      payload: {}
    });
  }

  render() {

    const {result, loading, ...others} = this.props
    let options = result ? result.data.list : []
    if(options  === undefined || options.length==0)  {
      options = []
    }

    return(
      <Spin spinning={loading}>
        <Select {...this.props} allowClear={true}>
          {
            options.map( (item) => {
              return <Option value={item.id} key={item.id} >{item.typename} </Option>
            })
          }
        </Select>
      </Spin>
    )
  }
}