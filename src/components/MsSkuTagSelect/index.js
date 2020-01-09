import React, { Component } from 'react'
import { connect } from 'dva';
import { Select } from 'antd'
const { Option } = Select

const namespace = 'itemtag';
const mapStateToProps = (state) => {
  const result = state[namespace].selectData;
  return {
    result
  };
};

@connect(mapStateToProps)
export default class MsSkuTagSelect extends Component {
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

  onChangeVal(val, option) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(val, option.props.title )
    }
  }
  render() {
    let options = this.props.result ? this.props.result.data : []
    if(options  === undefined || options.length==0)  {
      options = []
    }

    return(
      <Select {...this.props} allowClear={true} onChange={(val, option)=>this.onChangeVal(val, option)}>
        {
          options.map( (item) => {
            return <Option value={item.skuTagId} key={item.skuTagId} title={item.skuTagName}>{item.skuTagName} </Option>
          })
        }
      </Select>
    )
  }
}