import React, { Component, Fragment } from 'react';
import { Row, Card, Form, Input, Button, Table, Icon, Drawer, Divider, Popconfirm } from 'antd';
import { connect } from 'dva';
import {formatTime, responseMsg} from '@/utils/utils';
import styles from '../TableList.less';
import EditPage from './EditPage';
import DetailPage from './DetailPage';
import StatusSelect from '@/components/MsStatusSelect';
import QuestionTypeSelect from '@/components/MsQuestionTypeSelect';
const flagSelect =  [
  {key: 0, value: '焦虑自评'},
  {key: 1, value: '交往焦虑'},
  {key: 2, value: '自评抑郁'},
  {key: 3, value: '成人依赖'},
  {key: 4, value: '惧怕否定'},
  {key: 5, value: '信任心理'}
]
const FormItem = Form.Item;
const namespace = 'scoreRule';
@connect(({ scoreRule, loading }) => ({
  result: scoreRule.data,
  dataLoading: loading.effects['scoreRule/search'] ? true : false,
}))
@Form.create()

export default class Item extends Component {
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
  render() {
    const {detailData, detailVisible, editVisible, queryParam} = this.state
    const columns = [
      { title: '分类ID', width: 150, dataIndex: 'typename', key: 'typename' },
      { title: '规则名称', width: 200, dataIndex: 'rule_name', key: 'rule_name' },
      { title: '已选题号ID', width: 200, dataIndex: 'nums', key: 'nums' },
      { title: '题号区间', width: 200, dataIndex: 'qs_no', key: 'qs_no' },
      { title: '核算规则', width: 80, dataIndex: 'rule_str', key: 'rule_str' },
      { title: '简单描述', dataIndex: 'content_1', key: 'content_1' },
      { title: '操作',
        key: 'operation',
        width: 100,
        fixed: 'right',
        render: (text, record) => (
          <Fragment>
            <a onClick={()=>{this.editDrawer(record)}}>修改</a>
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
          question_type_id,
          typename,
          rule_name,
          nums,
          qs_no,
          rule_str,
          state,
          score_type,
          create_time,
          update_time,
          audio_path,
          content_1,
          content_2,
          content_3
        } = item

        return {
          key: idx,
          id,
          question_type_id,
          typename,
          rule_name,
          nums,
          qs_no,
          rule_str,
          state,
          score_type,
          create_time,
          update_time,
          audio_path: audio_path ? audio_path : '',
          content_1,
          content_2,
          content_3
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
          title={<span className={styles.tableTitle}><Icon type="appstore-o" /> 计分规则列表
                    <span className="pagenum"> (共 {tablePagination.total} 条记录)</span>
                  </span>}
          extra={<Button type="primary" onClick={()=>{this.editDrawer()}}>添加</Button>}
        >
          <Table
            bordered
            columns={columns}
            dataSource={tableData}
            size='small'
            scroll={{x: 1200}}
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
      </div>
    );
  }
}