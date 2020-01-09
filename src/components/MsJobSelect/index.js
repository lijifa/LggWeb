import React, { Component } from 'react'
import { connect } from 'dva';
import { Select } from 'antd'
const { Option } = Select

const namespace = 'job';
const mapStateToProps = (state) => {
  const result = state[namespace].selectData;
  return {
    result
  };
};

@connect(mapStateToProps)
export default class MsJobSelect extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

    this.searchList()
  }

  /* 列表初始化 */
  searchList() {
    const { dispatch } = this.props;
    console.log('jobSelect')
    dispatch({
      type: `${namespace}/queryAll`,
      payload: {}
    });
  }

  render() {
    //console.log(this.props)
    let options = this.props.result ? this.props.result.data : []
    if(options  === undefined || options.length==0)  {
      options = []
    }
    return(
      <Select {...this.props} allowClear={true}>
        {
          options.map( (item) => {
            return <Option value={item.jobMapId} key={item.jobMapId} >{item.jobName} </Option>
          })
        }
      </Select>
    )
  }
}