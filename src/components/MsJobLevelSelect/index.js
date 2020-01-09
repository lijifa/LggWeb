import React, { Component } from 'react'
import { connect } from 'dva';
import { Select, Spin } from 'antd'
const { Option } = Select

const namespace = 'joblevel';
@connect(({ joblevel, loading }) => ({
  result: joblevel.selectData,
  joblevelLoading: loading.effects['joblevel/queryAll']
}))
export default class MsJobLevelSelect extends Component {
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
    const {result, joblevelLoading, ...others} = this.props
    let options = result ? result.data : []
    if(options  === undefined || options.length==0)  {
      options = []
    }

    return(
      <Spin spinning={joblevelLoading}>
        <Select {...this.props} allowClear={true}>
          {
            options.map( (item) => {
              return <Option value={item.jobLevelId} key={item.jobLevelId} >{item.jobLevelName} </Option>
            })
          }
        </Select>
      </Spin>
    )
  }
}