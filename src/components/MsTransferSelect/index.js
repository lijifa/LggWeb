import React, { Component } from 'react'
import { Row, Col, Button, Table, Input, Icon } from 'antd';
import { connect } from 'dva';
import { getObjName } from '@/utils/utils';
import indexStyle from './index.less';
import _map from 'lodash/map';

const Search = Input.Search;
const namespace = 'employee';

@connect(({ employee, loading }) => ({
  result: employee.allUserList ? employee.allUserList.data : '',
  queryLoading: loading.effects['employee/queryAll'],
}))
export default class MsTransferSelect extends Component {
  
  state = {
    tableDataLeft: [],
    leftDataTmp: [],
    tableDataRight: [],
    rightDataTmp: [],
    selectedRowsLeft: [],
    selectedRowKeysLeft: [],
    selectedRowsRight: [],
    selectedRowKeysRight: []
  };

  componentDidMount() {
    //this.initList()
  }
  componentWillReceiveProps(nextProps) {
   // if (!nextProps.loading && (typeof this.props.onChange != 'function')) {
    if (nextProps.result != this.props.result) {
      const listData = nextProps.result ? nextProps.result : []
      let tableData = []
      
      if (listData) {
        tableData = listData.map((item, idx) => {
          const {
            userMapId,
            userName,
            dept
          } = item
  
          return {
            key: userMapId,
            userMapId,
            userName,
            deptName: getObjName(dept, 'deptName'),
          }
        })
      }
      this.setState({
        tableDataLeft: tableData,
        leftDataTmp: tableData,
        tableDataRight: [],
        rightDataTmp: [],
        selectedRowKeysLeft: [],
        selectedRowsLeft: [],
        selectedRowKeysRight: [],
        selectedRowsRight: [],
      })
    }
  }


  /* 初始化列表 */
  initList() {
    const { dispatch } = this.props;
    // const { searchParam } = this.state
    // let queryParam = {
    //   pageNumber: 1,
    //   pageSize: 15,
    //   startDate: '',
    //   endDate: '',
    //   condition: searchParam
    // }
    
    dispatch({
      type: `${namespace}/queryAll`,
      payload: {rechargeFlag: 0, userStatus: 0}
    });
  }

  /* 列表查询 */
  searchList(val, flag='left') {
    const {tableDataLeft, tableDataRight} = this.state
    let dataSource = (flag == 'left') ? tableDataLeft : tableDataRight
    if (flag == 'left') {
      if (!val) {
        this.setState({
          leftDataTmp: tableDataLeft
        })
      }else{
        let list = dataSource.filter(data => data.userName.indexOf(val) > -1);
        this.setState({
          leftDataTmp: list
        })
      }
    }else{
      if (!val) {
        this.setState({
          rightDataTmp: tableDataRight
        })
      }else{
        let list = dataSource.filter(data => data.userName.indexOf(val) > -1);
        this.setState({
          rightDataTmp: list
        })
      }
    }
  }

  changeList = (type='left') => {
    const {selectedRowsLeft, selectedRowKeysLeft, selectedRowsRight, selectedRowKeysRight, tableDataRight, tableDataLeft, rightDataTmp} = this.state
    let rightRowKey = []
    if (type == 'left') {
      selectedRowsLeft.map((item, kk) => {
        for (let index = (tableDataLeft.length-1); index >= 0 ; index--) {
          let i = tableDataLeft[index];
          if (i.key == item.key) {
            tableDataLeft.splice(index, 1)
            tableDataRight.unshift(i)
            rightRowKey.push(i.key)
            break;
          }
        }
      })
    }else{
      selectedRowsRight.map((item, kk) => {
        for (let index = (tableDataRight.length-1); index >= 0 ; index--) {
          let i = tableDataRight[index];
          if (i.key == item.key) {
            tableDataRight.splice(index, 1)
            tableDataLeft.unshift(i)
            rightRowKey.push(i.key)
            break;
          }
        }
      })
    }

    this.setState({
      tableDataRight,
      rightDataTmp: tableDataRight,
      tableDataLeft,
      leftDataTmp: tableDataLeft,
      selectedRowKeysRight: rightRowKey
    })
    
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(tableDataRight)
    }
  }

  onSelectLeftChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeysLeft: selectedRowKeys,
      selectedRowsLeft: selectedRows 
    });
  }

  onSelectRightChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeysRight: selectedRowKeys,
      selectedRowsRight: selectedRows 
    });
  }

  onLeftAllChoose = () => {
    const { result } = this.props
    let userMapIdArr = _map(result, 'userMapId');

    const listData = result
    let tableData = []
    
    if (listData) {
      tableData = listData.map((item, idx) => {
        const {
          userMapId,
          userName,
          dept
        } = item

        return {
          key: userMapId,
          userMapId,
          userName,
          deptName: getObjName(dept, 'deptName'),
        }
      })
    }
    this.setState({
      selectedRowKeysLeft: userMapIdArr,
      selectedRowsLeft: tableData,
    })
  }

  onRightAllChoose = () => {
    const { result } = this.props
    let userMapIdArr = _map(result, 'userMapId');
    const listData = result
    let tableData = []
    
    if (listData) {
      tableData = listData.map((item, idx) => {
        const {
          userMapId,
          userName,
          dept
        } = item

        return {
          key: userMapId,
          userMapId,
          userName,
          deptName: getObjName(dept, 'deptName'),
        }
      })
    }
    this.setState({
      selectedRowKeysRight: userMapIdArr,
      selectedRowsRight: tableData,
    })
  }

  render() {
    const {leftDataTmp, rightDataTmp, selectedRowsLeft, selectedRowKeysLeft, selectedRowKeysRight} = this.state
    const {btnAction, queryLoading} = this.props
    
    const leftNum = leftDataTmp.length
    const rightNum = rightDataTmp.length
    // rowSelection objects indicates the need for row selection

    const rowSelectionLeft = {
      selectedRowKeys: selectedRowKeysLeft,
      onChange: this.onSelectLeftChange,
      onSelectAll: this.onLeftAllChoose
    };
    const rowSelectionRight = {
      selectedRowKeys: selectedRowKeysRight,
      onChange: this.onSelectRightChange,
    };
    const tableColumns = [
      { title: '员工号', dataIndex: 'userMapId', key: 'userMapId', width:'110px', fixed: 'left' },
      { title: '员工姓名', dataIndex: 'userName', width:'100px', key: 'userName' },
      { title: '部门', dataIndex: 'deptName', key: 'deptName' }
    ]
    return (
      <div className={indexStyle.transferTable}>
        <Row className={indexStyle.title} type="flex" justify="space-between" align="middle">
          <Col span={11}>
            待选列表（共 {leftNum} 条）
          </Col>
          <Col span={2}>
          </Col>
          <Col span={11} className={indexStyle.rightTitle}>
            <Col span={12} className={indexStyle.leftText}>
              已选列表 （共 {rightNum} 条记录）
            </Col>
            <Col span={12} className={indexStyle.rightBtn}>
              {btnAction}
            </Col>
          </Col>
        </Row>
        <Row type="flex" justify="space-between" align="top">
          <Col span={11}>
            <div style={{padding:'0 15px 0', minHeight: '280px'}}>
              <div className={indexStyle.search}>
                <Search
                  placeholder="输入员工姓名快速查询"
                  enterButton="查询"
                  onSearch={value => this.searchList(value)}
                />
              </div>
              <Table
                bordered
                loading={queryLoading}
                columns={tableColumns}
                dataSource={leftDataTmp}
                size='small'
                scroll={{x: 500}}
                pagination={true}
                rowSelection={rowSelectionLeft}
              />
            </div>
          </Col>
          <Col span={2} className={`height-50`} type="flex" justify="space-between" align="middle">
            <div style={{marginTop:'56px'}}>
              <Button type="primary" onClick={()=>{this.changeList()}}>
                添加<Icon type="double-right" theme="outlined" />
              </Button>
              <br />
              <br />
              <Button type="danger" onClick={()=>{this.changeList('right')}}>
                <Icon type="double-left" theme="outlined" />移除
              </Button>
            </div>
          </Col>
          <Col span={11}>
            <div style={{padding:'0 15px 0', minHeight: '200px'}}>
              <div className={indexStyle.search}>
                <Search
                  placeholder="输入员工姓名快速查询"
                  enterButton="查询"
                  onSearch={value => this.searchList(value, 'right')}
                />
              </div>
              <Table
                bordered
                columns={tableColumns}
                dataSource={rightDataTmp}
                size='small'
                scroll={{x: 500}}
                pagination={true}
                rowSelection={rowSelectionRight}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}