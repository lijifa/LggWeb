import React, { Component, Fragment } from 'react';
import { Row, Card, Form, Input, Button, Table, Col, Spin } from 'antd';
import { connect } from 'dva';
import {formatTime, responseMsg} from '@/utils/utils';
import styles from '../TableList.less';
import QuestionTypeSelect from '@/components/MsQuestionTypeSelect';

const FormItem = Form.Item;
const namespace = 'question';

@connect(({ question, loading }) => ({
  result: question.data,
  selectData: question.selectData,
  dataLoading: loading.effects['question/search'] ? true : false,
  selectDataLoading: loading.effects['question/queryAll'] ? true : false,
}))
@Form.create()

export default class Item extends Component {
  state = {
    detailVisible: false,
    editVisible: false,
    queryParam: {
      pageNumber: 1,
      pageSize: 15,
      startDate: '',
      endDate: '',
      condition: {
        "question_type_id": this.props.tid
      }
    },
    // queryChooseParam: {
    //   condition: {
    //     "question_type_id": this.props.tid,
    //     "": this.props
    //   }
    // },
    listData: {},
    keyStateList:[],
    keysArray: this.props.choosQsKey ? this.props.choosQsKey : [],
    valsArray: []
  };
 
  componentDidMount() {
    this.searchList()
    this.getValsArray()
  }

  // 当编辑时回显已选择的valsArray
  // getValsArray() {
  //   let chooseQsKey = this.props.choosQsKey
  //   if (chooseQsKey.length < 1) {
  //     return;
  //   }
  //   let listData = this.props.result.data.list || []
  //   let valsArrayTemp = []

  //   listData.map((item) => {
  //     if (chooseQsKey.indexOf(item.id) >= 0) {
  //       item['key'] = item.id
  //       valsArrayTemp.push(item)
  //     }
  //   })
    
  //   this.setState({
  //     valsArray: valsArrayTemp
  //   })
  // }

  /* 当编辑时回显获取已选择的 */
  getValsArray() {
    let chooseQsKeyTmp = this.props.choosQsKey
    if (chooseQsKeyTmp.length < 1) {
      return;
    }

    //转换为数字
    let chooseQsKey = chooseQsKeyTmp.map((item) => {
      return parseInt(item)
    })

    const { dispatch, tid } = this.props;
    //const { queryParam } = this.state
    let queryChooseParam = {
      condition: {
        "question_type_id": tid,
        "question_no": chooseQsKey
      }
    }

    dispatch({
      type: `${namespace}/queryChooseAll`,
      payload: queryChooseParam
    }).then(() => {
      const { selectData } = this.props;
      let listDataTmp = selectData.data.list
      let listData = listDataTmp.map((item) => {
        item['key'] = item.id
        return item
      })
      this.setState({
        valsArray: listData,
        keysArray: chooseQsKey
      })
    });
  }

  /* 列表初始化 */
  searchList() {
    const { dispatch } = this.props;
    const { queryParam } = this.state
  
    dispatch({
      type: `${namespace}/search`,
      payload: queryParam
    })
  }

  /* 查询操作 */
  handleSearch = e => {
    e.preventDefault();
    const { form } = this.props;
    let oldQuery = this.state.queryParam
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      
      const values = {
        ...fieldsValue,
      };

      this.setState({
        queryParam: Object.assign({}, oldQuery, {
          condition: values,
          pageNumber: 1
        })
      }, ()=>{this.searchList()});
    });
  };

  /* 查询条件重置 */
  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      queryParam: {
        pageNumber: 1,
        pageSize: 15,
        startDate: '',
        endDate: '',
        condition: {}
      }
    }, ()=>{this.searchList()});
  }
  
  renderSearchForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline" className="search">
        <div className="kuai">
          <span className="span">分类名称 :</span>
          <FormItem className="inputW160">
            {getFieldDecorator('question_type_id')(
              <QuestionTypeSelect placeholder="请选择分类" onChange={(e)=>this.choosQstype(e)}/>
            )}
          </FormItem>
        </div>
        <div className="btnkuai">
          <span className={styles.submitButtons}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
          </span>
        </div>
      </Form>
    );
  }

  //选择
  checkChoose = (target) => {
    const { keysArray } = this.state
    console.log('kChoose = (target)    keysArray')
    console.log(target, keysArray)
    if (keysArray.indexOf(target) >= 0) {
      return true;
    }else{
      return false
    }
  }

  //左侧选择
  addItem = (key, val) =>{
    const { keysArray, valsArray} = this.state
    keysArray.push(key)
    valsArray.push(val)

    this.setState({
      keysArray,
      valsArray
    })
  }

  //删除
  onDelete (key) {
    const { keysArray, valsArray } = this.state;
    console.log('keysArray, valsArray=====')
    console.log(key)
    console.log(keysArray, valsArray)
    console.log('keysArray, valsArray======')
    this.setState({ valsArray: valsArray.filter(item => item.key != key) });

    let keyIndex = keysArray.indexOf(key);
    if (keyIndex != -1) {
      keysArray.splice(keyIndex, 1);
      this.setState({
        keysArray: keysArray
      })
    }
  }

  //选择好了以后放回上层
  subChoose = () => {
    const { valsArray, keysArray} = this.state
    const { closeModel, chooseQsOption} = this.props
    chooseQsOption(valsArray, keysArray)
    closeModel()
  }

  render() {
    const { closeModel, result, dataLoading} = this.props
    const { valsArray, queryParam } = this.state

    const columns_1 = [{
      title: '问题ID',
      dataIndex: 'id',
      key: 'id',
      width: '80px'
    },{
      title: '题号',
      dataIndex: 'question_no',
      key: 'question_no',
      width: '80px'
    },{
      title: '问题标题',
      dataIndex: 'title',
      key: 'title'
    }, {
      title: '操作',
      key: 'action',
      width: '60px',
      className: 'table_c',
      render: (text, record) => {
        return (
          <div>
            {this.checkChoose(record.id)
              ?
              <a style={{color:'#ccc'}}>已选择</a>
              :
              <a onClick={()=>{this.addItem(record.id, record)}}>选择</a>
            }
          </div>
        )
      }
    }]

    const columns_2 = [{
      title: '问题标题',
      dataIndex: 'title',
      key: 'title'
    }, {
      title: '操作',
      key: 'action',
      className: 'table_c',
      render: (text, record) => {
        return (
          <div>
            <a onClick={() => this.onDelete(record.key)}>移除</a>
          </div>
        )
      }
    }]

    const listData = this.props.result.data || {}
    const tablePagination = {
      total: listData.totalRow || 0,
      current: queryParam.pageNumber,
      pageSize: queryParam.pageSize,
      onChange: pageNumber => {
        this.setState({queryParam: Object.assign({}, queryParam, {pageNumber: pageNumber})}, this.searchList)
      }
    }

    let tableData = null
    let list = listData.list

    if (list) {
      tableData = list.map((item, idx) => {
        const {
          id,
          question_no,
          title,
        } = item

        return {
          key: id,
          id: id,
          question_no,
          title,
        }
      })
    }

    return (
      <div className="tkcommon" style={{ paddingTop: '10px' }}>
        <div>
          <Row>
            <Col span={15} style={{borderRight: '1px solid #ccc'}}>
              {/* <div className='search clearfix' style={{padding: '10px'}}>
                <div className="kuai">
                  <span className="span">问题名称 :</span>
                  <Input className="w160" maxLength='20' placeholder='选择问题名称'  />
                </div>
                <Button style={{top: 50,right: 'auto'}} className='searchbut' type='primary' icon='search' onClick={this.queryList}> 查询 </Button>
              </div> */}

              <div style={{padding: '10px'}}>
                <Spin spinning={dataLoading}>                
                  <Table
                    columns={columns_1}
                    dataSource={tableData}
                    pagination={tablePagination}
                    bordered={true}
                    size='small'
                  />
                </Spin>
              </div>
            </Col>
            <Col span={9} style={{padding: '10px'}}>
              <div style={{paddingTop: '10px'}}>
                <Table
                  columns={columns_2}
                  dataSource={valsArray}
                  bordered={true}
                  size='small'
                />
              </div>
            </Col>
          </Row>
        </div>
      
        <div
          className="tansubmit"
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            textAlign: 'right',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px',
          }}
        >
          <Spin spinning={dataLoading}>
            <Button icon='close' onClick={() => {closeModel()}}
              style={{
                marginRight: 8,
              }}>取消</Button>
            <Button icon='check' type='primary' onClick={()=>this.subChoose()}>确认</Button>
          </Spin>
        </div>
      </div>
    )
  }
}