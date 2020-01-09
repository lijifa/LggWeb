import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Form, Input,  Button, Table, Icon, Spin } from 'antd';
import { connect } from 'dva';
import { changeTime } from '@/utils/utils';
import DeptSelect from '@/components/MsDeptSelect';
import JobLevelSelect from '@/components/MsJobLevelSelect';
import styles from './index.less';
const FormItem = Form.Item;
const namespace = 'employee';
@connect(({ employee, loading }) => ({
  result: employee.data,
  dataLoading: loading.effects['employee/search'],
}))
@Form.create()
export default class Employee extends Component {
  state = {
    detailData: '',
    expandForm: false,
    queryParam: {
      pageNumber: 1,
      pageSize: 15,
      startDate: '',
      endDate: '',
      wd:'',
      condition: {}
    }
  };

  //初始查询
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
      
      let {userMapId, userName, userMobile, wd, jobLevelId, deptMapId, createTime} = fieldsValue
      let date= createTime ? changeTime(createTime[0], createTime[1]) : ''
      const values = {
        userMapId,
        userName,
        userMobile,
        jobLevelId,
        deptMapId
      };

      this.setState({
        queryParam: Object.assign({}, oldQuery, {
          condition: values,
          startDate: date ? date[0] : '',
          endDate: date ? date[1] : '',
          wd: wd,
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
        wd:'',
        condition: {}
      }
    }, ()=>{this.searchList()});
  }
  
  //搜索栏模板
  renderSearchForm(searchItemStyle = 'formItemHide') {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const btnType = searchItemStyle == 'formItemHide' ? <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
        高级 <Icon type="caret-down" />
      </a>
      : 
      <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
        普通 <Icon type="caret-up" />
      </a>

    return (
      <Form onSubmit={this.handleSearch} layout="inline" className="search">
        <div className="kuai">
          <span className="span">领导工号 :</span>
          <FormItem className="inputW160">
            {getFieldDecorator('userMapId')(<Input placeholder="请输入领导工号" />)}
          </FormItem>
        </div>
        <div className="kuai">
          <span className="span">领导姓名 :</span>
          <FormItem className="inputW160">
            {getFieldDecorator('userName')(<Input placeholder="请输入领导姓名" />)}
          </FormItem>
        </div>
        <div className="kuai">
          <span className="span">领导手机 :</span>
          <FormItem className="inputW160">
            {getFieldDecorator('userMobile')(<Input placeholder="请输入领导手机" />)}
          </FormItem>
        </div>
        <div className={searchItemStyle}>
          <span className="span">领导职级 :</span>
          <FormItem className="inputW160">
            {getFieldDecorator('jobLevelId')
            (<JobLevelSelect placeholder='请选择职级'/>)
            }
          </FormItem>
        </div>
        <div className={searchItemStyle}>
          <span className="span">领导卡号 :</span>
          <FormItem className="inputW160">
            {getFieldDecorator('wd')(<Input placeholder="请输入领导卡号" />)}
          </FormItem>
        </div>
        <div className={searchItemStyle}>
          <span className="span">领导部门 :</span>
          <FormItem className="inputW160">
            {getFieldDecorator('deptMapId')(
              <DeptSelect placeholder="请选择部门" />
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
            {btnType}
          </span>
        </div>
      </Form>
    );
  }
  //切换高级/普通查询条件
  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderSearchForm('kuai') : this.renderSearchForm('formItemHide');
  }

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    })
  }

  // addLinder = () =>{
  //   const {selectedRowKeys, selectedRows} = this.state
  //   const {onClose} = this.props
    
  //   if (typeof this.props.onChangeLinder === 'function') {
  //     this.props.onChangeLinder(selectedRowKeys, selectedRows)
  //     onClose()
  //   }
  // }

  checkChoose = (target) => {
    const {keysArray} = this.props
    if (keysArray.indexOf(target) >= 0) {
      return true;
    }else{
      return false
    }
  }

  addLinder2 = (key, val) =>{
    if (typeof this.props.onChangeLinder === 'function') {
      this.props.onChangeLinder(key, val)
      //onClose()
    }
  }
  //页面模板
  render() {
    const columns = [
      { title: '领导工号', width: 120, dataIndex: 'managerId', key: 'managerId' },
      { title: '领导姓名', dataIndex: 'manageName', key: 'manageName' },
      { title: '操作',
        key: 'operation',
        width: 80,
        fixed: 'right',
        render: (text, record) => (
          <Fragment>
          {this.checkChoose(record.managerId)
            ?
            <a style={{color:'#ccc'}}>已选择</a>
            :
            <a onClick={()=>{this.addLinder2(record.managerId, record)}}>选择</a>
          }
        </Fragment>
        ),
      }
    ];
    const {result, dataLoading} = this.props
    const {queryParam} = this.state
    const listData = result ? result.data : {}
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
      tableData = list.map((item) => {
        const {
          userMapId,
          userName
        } = item

        return {
          key: userMapId,
          managerId: userMapId,
          manageName: userName
        }
      })
    }

    return (
      <div>
        <Row style={{marginBottom:'15px'}}>
          <Card key={'a'} className={styles.tableListForm}>
            <div>{this.renderForm()}</div>
          </Card>
        </Row>
        <div className={styles.tableListTitle}>
          <span className={styles.tableTitle}>
            <Icon type="appstore-o" /> 领导列表
            <span className="pagenum"> (共 {tablePagination.total} 条记录)</span>
          </span>
        </div>
          <Table
            loading={dataLoading}
            bordered
            columns={columns}
            dataSource={tableData}
            size='small'
            pagination={tablePagination}
            scroll={{ y: 240 }}
          />
      </div>
    );
  }
}