import React, { Component, Fragment } from 'react';
import { Row, Card, Form, Input, Button, Table, Icon, Drawer, Divider, Popconfirm } from 'antd';
import { connect } from 'dva';
import {formatTime, responseMsg, getObjStatus} from '@/utils/utils';
import styles from '../TableList.less';
import EditPage from './EditPage';
import DetailPage from './DetailPage';
import QuestionTypeSelect from '@/components/MsQuestionTypeSelect';

const FormItem = Form.Item;
const namespace = 'oper';
const stateSelect =  [
  {key: 0, value: '正常'},
  {key: 1, value: '禁用'}
]
@connect(({ oper, loading }) => ({
  result: oper.data,
  dataLoading: loading.effects['oper/search'] ? true : false,
}))
@Form.create()

export default class Trade extends Component {

  state = {
    detailData: null,
    detailVisible: false,
    editVisible: false,
    queryParam: {
      pageNumber: 1,
      pageSize: 15,
      startDate: '',
      endDate: '',
      condition: {}
    }
  };
 
  componentDidMount() {
    this.searchList()
  }

  /* 列表初始化 */
  searchList() {
    const { dispatch } = this.props;
    const { queryParam } = this.state
  
    dispatch({
      type: `${namespace}/search`,
      payload: queryParam
    });
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
          <span className="span">会员名 :</span>
          <FormItem className="inputW160">
            {getFieldDecorator('title')(<Input placeholder="请输入会员名" />)}
          </FormItem>
        </div>

        <div className="kuai">
          <span className="span">分类问题 :</span>
          <FormItem className="inputW160">
            {getFieldDecorator('question_type_id')(
              <QuestionTypeSelect placeholder="请选择分类问题" />
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

  /* 删除操作 */
  handleDel = e => {
    const { dispatch } = this.props;

    let queryParam = {
      id: e.id
    }
    dispatch({
      type: `${namespace}/del`,
      payload: queryParam,
      callback: (res) => {
        if (res) {
          if (res.code == '00') {
            responseMsg(res)
            this.searchList()
          }else{
            responseMsg(res)
          }
        }
      }
    });
  };

  /* 弹出/隐藏 详情 */
  detailDrawer = (res='') =>{
    const { detailVisible } = this.state;
    this.setState({
      detailVisible: !detailVisible,
      detailData: !detailVisible ? res : ''
    })
  }

  /* 弹出/隐藏 编辑 */
  editDrawer = (res='') =>{
    const { editVisible } = this.state;
    this.setState({
      editVisible: !editVisible,
      detailData: !editVisible ? res : ''
    })
  }

  /* 弹出/隐藏 答案 */
  editAnswerDrawer = (res='') =>{
    const { editAnswerVisible } = this.state;
    this.setState({
      editAnswerVisible: !editAnswerVisible,
      detailData: !editAnswerVisible ? res : ''
    })
  }
  render() {
    const {detailData, detailVisible, editVisible, editAnswerVisible, queryParam} = this.state
    const columns = [
      { title: '用户名', width: 120, dataIndex: 'username', key: 'username' },
      { title: '昵称', width: 150, dataIndex: 'nickname', key: 'nickname' },
      { title: '级别', dataIndex: 'level', key: 'level' },
      { title: '会员状态', dataIndex: 'stateName', key: 'stateName' },
      { title: '添加时间', dataIndex: 'create_time', key: 'create_time' },
      { title: '操作',
        key: 'operation',
        width: 200,
        fixed: 'right',
        render: (text, record) => (
          <Fragment>
            <a onClick={()=>{this.editDrawer(record)}}>详情</a>
            <Divider type="vertical" />
            <Popconfirm placement="topRight" title="你确定要执行此操作吗?" onConfirm={() => { this.handleDel(record) }}>
              <a>删除</a>
            </Popconfirm>
          </Fragment>
        ),
      },
    ];
    
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
          username,
          password,
          nickname,
          level,
          state,
          create_time,
          update_time
        } = item

        return {
          key: idx,
          id,
          username,
          password,
          nickname,
          level,
          state,
          stateName: getObjStatus(stateSelect, state),
          create_time,
          update_time
        }
      })
    }
    return (
      <div>
        <Row key={'a'} style={{marginBottom:'15px'}}>
          <Card className={styles.tableListForm}>
            <div>{this.renderSearchForm()}</div>
          </Card>
        </Row>
        <Card key={'b'}
          className={styles.tableListTitle}
          title={<span className={styles.tableTitle}><Icon type="appstore-o" /> 问题列表
                    <span className="pagenum"> (共 {tablePagination.total} 条记录)</span>
                  </span>}
          extra={<Button type="primary" onClick={()=>{this.editDrawer()}}>添加</Button>}
        >
          <Table
            bordered
            columns={columns}
            dataSource={tableData}
            size='small'
            scroll={{x: 800}}
            pagination={tablePagination}
          />
        </Card>
        <Drawer
          title="详情"
          placement="right"
          width={'30%'}
          destroyOnClose={true}
          onClose={this.detailDrawer}
          visible={detailVisible}
        >
          <DetailPage detailData={detailData}/>
        </Drawer>

        <Drawer
          title={detailData ? '编辑' : '添加'}
          placement="right"
          width={'30%'}
          destroyOnClose={true}
          onClose={this.editDrawer}
          visible={editVisible}
          maskClosable={false}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
          <EditPage
            detailData={detailData}
            onClose={this.editDrawer}
            onReturnList={
              ()=>{
                this.searchList()
                this.editDrawer()
              }
            }
          />
        </Drawer>

        <Drawer
          title={'编辑答案'}
          placement="right"
          width={'50%'}
          destroyOnClose={true}
          onClose={this.editAnswerDrawer}
          visible={editAnswerVisible}
          maskClosable={false}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
        </Drawer>
      </div>
    );
  }
}