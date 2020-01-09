import React, { Component } from 'react'
import { connect } from 'dva';
import { Row, Col, Button, Table, Input, Icon } from 'antd';
import indexStyle from './index.less';

//批量选择门店
const namespace = 'shop';
const mapStateToProps = (state) => {
  const result = state[namespace].selectData;
  return {
    result
  };
};

@connect(mapStateToProps)
export default class MsShopTransferSelect extends Component {
  state = {
    tableDataLeft: [],
    leftDataTmp: [],
    tableDataRight: [],
    rightDataTmp: [],
    tableColumnsLeft: [],
    tableColumnsRight: [],
    editVisible: false,
    selectedRowsLeft: [],
    selectedRowsRight: [],
    dataLeft: [],
    dataRight: [],
  };

  componentDidMount() {

    const { dispatch, dataLeft, dataRight } = this.props

    const columnsLeft = [
      //{ title: '门店编号', dataIndex: 'shopMapId', key: 'shopMapId' },
      { title: '未选', dataIndex: 'shopName', key: 'shopName' }
    ];
    const columnsRight = [
      //{ title: '门店编号', dataIndex: 'shopMapId', key: 'shopMapId' },
      { title: '已选', dataIndex: 'shopName', key: 'shopName' }
    ];

    console.log('dataLeft')
    console.log(dataLeft)

    this.setState({
      tableColumnsLeft: columnsLeft,
      tableColumnsRight: columnsRight,
      tableDataLeft: dataLeft,
      tableDataRight: dataRight,
      leftDataTmp: dataLeft,
      rightDataTmp: dataRight,
    })

    dispatch({
      type: `${namespace}/queryAll`,
      payload: {}
    });



  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataLeft != this.props.dataLeft) {
  //     this.setState({
  //       tableDataLeft: nextProps.dataLeft,
  //       leftDataTmp: nextProps.dataLeft
  //     })
  //   }
  // }

  //初始化门店列表
  initList() {
    console.log('initList')
    const { tableDataLeft, tableDataRight } = this.state
    const listData = this.props.result || {}
    let tableData = []
    let list = listData.data

    //只在初始化后执行一次
    if (tableDataLeft.length > 0 || tableDataRight.length > 0) {
      return
    }

    if (list) {
      tableData = list.map((item, idx) => {
        const {
          shopMapId,
          shopName
        } = item

        return {
          key: idx,
          shopMapId,
          shopName
        }
      })
    }
    let selectedShopList = this.props.shopList || []

    console.log('selectedShopList')   
    console.log(selectedShopList)

    //查询全部门店列表并添加至左侧或右侧菜单
    for (let i = 0; i < tableData.length; i++) {
      let row = tableData[i]
      let selected = false
      //如果门店已选中门店则移至右侧
      for (let j = 0; j < selectedShopList.length; j++) {
        if (row.shopMapId == selectedShopList[j].shopMapId) {
          console.log('selectedShopList[j]')   
          console.log(selectedShopList[j])
          tableDataRight.unshift(row)
          selected = true
          break
        }
      }
      //未选中则移至左侧
      if (selected == false) {
        tableDataLeft.unshift(row)
      }
    }

  }

  changeList = (type = 'left') => {
    const { selectedRowsLeft, selectedRowsRight, tableDataRight, tableDataLeft, rightDataTmp } = this.state
    let leftTmp = []
    if (type == 'left') {
      selectedRowsLeft.map((item, kk) => {
        for (let index = (tableDataLeft.length - 1); index >= 0; index--) {
          let i = tableDataLeft[index];
          if (i.key == item.key) {
            tableDataLeft.splice(index, 1)
            tableDataRight.unshift(i)
            break;
          }

        }
      })
    } else {
      selectedRowsRight.map((item, kk) => {
        for (let index = (tableDataRight.length - 1); index >= 0; index--) {
          let i = tableDataRight[index];
          if (i.key == item.key) {
            tableDataRight.splice(index, 1)
            tableDataLeft.unshift(i)
            break;
          }

        }
      })
    }

    this.setState({
      tableDataRight,
      rightDataTmp,
      tableDataLeft,
      leftDataTmp: tableDataLeft,
    })

    if (typeof this.props.onChange === 'function') {
      let shopMapIdList = [];
      for (var index = 0; index < tableDataRight.length; index++) {
        shopMapIdList.push(tableDataRight[index].shopMapId)
      }

      this.props.onChange(shopMapIdList)
    }
  }


  onSelectLeftChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowsLeft: selectedRows
    });
  }

  onSelectRightChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowsRight: selectedRows
    });
  }
  render() {
    const { tableColumnsLeft, tableDataLeft, tableColumnsRight, leftDataTmp, rightDataTmp, selectedRowsLeft } = this.state

    this.initList()

    const rowSelectionLeft = {
      onChange: this.onSelectLeftChange,
    };
    const rowSelectionRight = {
      onChange: this.onSelectRightChange,
    };

    return (
      <div className={indexStyle.transferTable}>
        <Row>
          <Col span={10}>
            <div style={{ padding: '0 15px 0' }}>
              <Table
                bordered
                columns={tableColumnsLeft}
                dataSource={leftDataTmp}
                size='small'
                rowSelection={rowSelectionLeft}
              />
            </div>
          </Col>
          <Col span={4} className={`height-50`}>
            <div>
              <Button type="primary" onClick={() => { this.changeList() }}>
                添加<Icon type="double-right" theme="outlined" />
              </Button>
              <br />
              <br />
              <br />
              <Button type="danger" onClick={() => { this.changeList('right') }}>
                <Icon type="double-left" theme="outlined" />移除
              </Button>
            </div>
          </Col>
          <Col span={10}>
            <div style={{ padding: '0 15px 0' }}>
              <Table
                bordered
                columns={tableColumnsRight}
                dataSource={rightDataTmp}
                size='small'
                rowSelection={rowSelectionRight}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}