import React, { Component } from 'react'
import { connect } from 'dva';
import { Row, Col, DatePicker, Button, Form, Spin } from 'antd'
import moment from 'moment';
// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import {responseMsg} from '@/utils/utils';
const namespace = 'menunotice';
@connect(({ menunotice, loading }) => ({
  updateLoading: loading.effects['menunotice/update'] ? true : false,
  batchUpdateLoading: loading.effects['menunotice/batchUpdate'] ? true : false,
}))
@Form.create()
export default class MsMenuNotice extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    editorState: BraftEditor.createEditorState(`${this.props.detailData.noticeMsg}`), // 设置编辑器初始内容
    outputHTML: '<p></p>',
    verifyFlg:''
  }

  valueChanged(key, value) {
    let obj = {}
    obj[`${key}`] = value
    this.setState(obj)
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML()
    })
  }

  /* 审核操作 */
  checkSubmit = (flag) => {
    const { dispatch, detailData, onReturn } = this.props;
    const { outputHTML } = this.state
    const values = {
      menuNoticeList:[{
        id: detailData.id,
        verifyFlg: flag,
        noticeMsg: outputHTML,
        //sendTime: sendTime.valueOf()
      }]
    };
    
    dispatch({
      type: `${namespace}/batchUpdate`,
      payload: values,
      callback: (res) => {
        if (res) {
          if (res.code == '00') {
            responseMsg(res)
            onReturn()
          }else{
            responseMsg(res)
          }
        }
      }
    })
  }

  render() {
    const { editorState } = this.state
    const { batchUpdateLoading } = this.props
    const controls = [ 'font-size', 'bold', 'italic', 'underline', 'text-color', 'separator' ]

    return(
      <Spin spinning={batchUpdateLoading}>
        <div
          style={{
            position: 'relative',
            height: '320px',
            width: '100%',
            border: '1px solid #fdfdfd' ,
            borderRadius: '0 0 4px 4px',
          }}>
          <Form layout='vertical'> 
            <Row>
              <BraftEditor
                className="my-editor"
                contentStyle={{height: 230, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)'}}
                controls={controls}
                placeholder="请输入菜单内容"
                value={editorState}
                onChange={this.handleChange}
              />
            </Row>
            <Row
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                left: 0,
                borderRadius: '0 0 4px 4px',
              }}
            >
              <Col span={14}>
                <DatePicker onChange={(val)=>{this.valueChanged(val)}} style={{width:'140px'}}/>
              </Col>
              <Col span={10} style={{textAlign:'right'}}>
                <Button type="danger" onClick={()=>{this.checkSubmit(2)}} style={{marginRight:'10px'}}> 拒绝 </Button>
                <Button type="primary" onClick={()=>{this.checkSubmit(1)}}> 通过 </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Spin>
    )
  }
}