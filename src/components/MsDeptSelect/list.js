import React, { Component, Fragment } from 'react';
import { Row, Col, Card, Form, Input, Button, Table } from 'antd';
import { connect } from 'dva';
import { formatTime, getObjStatus,getObjName } from '@/utils/utils';
import styles from './index.less';
import OrgSelect from '@/components/MsOrgSelect';
const FormItem = Form.Item;
const deptStatusSelect = [
  { key: '0', value: '正常' },
  { key: '1', value: '暂停' }
]
const namespace = 'dept';

@connect(({ dept, loading }) => ({
  result: dept.deptList,
  loading: loading.effects['dept/querySelectList'] ? true : false,
}))
@Form.create()

export default class Dept extends Component {
  state = {
    detailData: null,
    editVisible: false,
    queryParam: {
      pageNumber: 1,
      pageSize: 15,
      startDate: '',
      endDate: '',
      condition: {
        orgMapId: '',
        deptMapId: '',
        deptName: '',
        levelFlag: this.props.levelFlag || ''
      }
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
      type: `${namespace}/querySelectList`,
      payload: queryParam
    });
  }

  /* 查询操作 */
  // deptSearchList = e => {
  //   e.preventDefault();
  //   const { form, levelFlag } = this.props;
  //   let oldQuery = this.state.queryParam
  //   form.validateFields((err, fieldsValue) => {
  //     if (err) return;
  //     const values = {
  //       ...fieldsValue,
  //       levelFlag: levelFlag || '',
  //       createTime: fieldsValue.createTime && fieldsValue.createTime.valueOf(),
  //     };

  //     this.setState({
  //       queryParam: Object.assign({}, oldQuery, {
  //         condition: values,
  //         pageNumber: 1
  //       })
  //     }, ()=>{this.searchList()});
  //   });
  // };

  // deptSearchList = () => {
  //   this.searchList()
  // };

  /* 查询条件重置 */
  handleFormReset = () => {
    const { form, levelFlag } = this.props;
    form.resetFields();
    this.setState({
      queryParam: {
        pageNumber: 1,
        pageSize: 15,
        startDate: '',
        endDate: '',
        condition: {
          levelFlag: levelFlag || ''
        }
      }
    }, ()=>{this.searchList()});
  }


  queryChange (key, val, falg = false) {
    let oldQuery = this.state.queryParam
    if(falg){
      oldQuery.pageNumber = 1
      oldQuery.condition[key] = val
      this.setState({queryParam: oldQuery})
    } else {
      let tmpObj = {pageNumber: 1}
      tmpObj[key] = val
      this.setState({queryParam: Object.assign({}, oldQuery, tmpObj)})
    }
  }

  renderSearchForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form layout="inline" className="search">
        <div className="kuai">
          <span className="span">部门编号 :</span>
          <FormItem className="inputW160">
            {getFieldDecorator('deptMapId')(
              <Input
                placeholder="请输入部门编号"
                onChange={event => this.queryChange('deptMapId', event.target.value, true)}
              />)}
          </FormItem>
        </div>
        <div className="kuai">
          <span className="span">部门名称 :</span>
          <FormItem className="inputW160">
            {getFieldDecorator('deptName')(
              <Input
                placeholder="请输入部门名称"
                onChange={event => this.queryChange('deptName', event.target.value, true)}
              />)}
          </FormItem>
        </div>
        <div className="kuai">
          <span className="span">所属机构 :</span>
          <FormItem className="inputW160">
            {getFieldDecorator('orgMapId')
              (<OrgSelect
                placeholder='请选择所属机构'
                onChange={event => this.queryChange('orgMapId', event, true)}
              />)}
          </FormItem>
        </div>

        <div className="btnkuai">
          <span className={styles.submitButtons}>
            <Button
              type="primary"
              onClick={()=>this.searchList()}
            >
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

  editDrawer = (res = '') => {
    if(typeof this.props.onChoose === 'function'){
      this.props.onChoose(res)
    }
  }
  
  render() {
    const {queryParam} = this.state;
    const {result, loading} = this.props;
    const listData = result.data || {};
    const columns = [
      { title: '部门编号', width: 120, dataIndex: 'deptMapId', key: 'deptMapId' },
      { title: '部门名称', dataIndex: 'deptName', key: 'deptName' },
      { title: '上级部门', width: 220, dataIndex: 'parentDeptName', key: 'parentDeptName' },
      { title: '状态', width: 50, dataIndex: 'deptStatusName', key: 'deptStatusName' },
      {
        title: '操作',
        key: 'operation',
        width: 100,
        fixed: 'right',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => { this.editDrawer(record) }}>选择</a>
          </Fragment>
        ),
      },
    ];

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
          deptMapId,
          parentDeptId,
          orgMapId,
          deptName,
          parentDept,
          levelCount,
          manager,
          deptStatus,
          tel,
          createTime,
          updateTime
        } = item

        return {
          key: idx,
          deptMapId,
          parentDeptId,
          orgMapId,
          deptName,
          parentDept,
          parentDeptName: getObjName(parentDept, 'deptName'),
          levelCount,
          manager,
          deptStatus,
          deptStatusName: getObjStatus(deptStatusSelect, deptStatus),
          tel,
          createTime: formatTime(createTime),
          updateTime: formatTime(updateTime)
        }
      })
    }
    return (
      <div>
        <Row style={{ marginBottom: '15px' }}>
          <Card key={'a'} className={styles.tableListForm}>
            <div>{this.renderSearchForm()}</div>
          </Card>
        </Row>
        <Table
          loading={loading}
          bordered
          columns={columns}
          dataSource={tableData}
          pagination={tablePagination}
          size='small'
          scroll={{y: 260}}
        />
      </div>
    );
  }
}