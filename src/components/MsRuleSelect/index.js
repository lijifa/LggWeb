import React, { Component, Fragment } from 'react'
import { Input, Modal } from 'antd'
import ListPage from './list';
const Search = Input.Search;

export default class MsDeptSelect extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    searchModelVisible: false,
    deptData: '',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deptreset == 'f') {
      this.setState({
        deptData: ''
      })
    }
  }

  //搜索列表弹框
  searchModel = () => {
    this.setState({
      searchModelVisible: true,
    })
  }

  closeSearchModel = () => {
    this.setState({
      searchModelVisible: false,
    })
  }

  //弹窗后的选择后的回调
  callBackVal = (val) =>{
    this.setState({
      deptData: val
    }, ()=>{
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(val.deptMapId)
      }

      if (typeof this.props.getMore === 'function') {
        this.props.getMore(val)
      }

      this.closeSearchModel()
    })
  }

  //清除数据
  // clearDeptData = () => {
  //   if (typeof this.props.onChange === 'function') {
  //     this.props.onChange(val.deptMapId)
  //   }
  // }
  
  render() {
    const {searchModelVisible, deptData} = this.state
    const {deptName, levelFlag, ...others} = this.props
 
    return(
      <Fragment>
        <Search
          {...others}
          placeholder="请选择部门"
          value={deptData ? deptData.deptName : (deptName ? deptName : '')}
          onSearch={value => this.searchModel(value)}
          onClick={value => this.searchModel(value)}
        />
        
        <Modal
          title="选择部门"
          centered={true}
          visible={searchModelVisible}
          maskClosable={false}
          bodyStyle={{textAlign:'center'}}
          width={800}
          height={500}
          footer={null}
          onCancel={()=>{this.closeSearchModel()}}
        >
          <ListPage onClose={()=>this.closeSearchModel()} onChoose={(val)=>this.callBackVal(val)} levelFlag={levelFlag}/>
        </Modal>
      </Fragment>
    )
  }
}