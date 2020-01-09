import {Component} from 'react'
import webConfig from 'utils/webConfig'
import React from 'react'
import {Button, Spin, Table, Modal, Form, Input, message, Row, Col, Radio, Icon} from 'antd'
import ShopSelect from 'commons/components/TkShopSelect'
import { covertMoney, covertMoney2Yuan } from 'utils/core'
import StatusSelect from 'commons/components/StatusSelect'
const skuTypeList = [
  {key: '210210', value: '商品原料'},
  {key: '231210', value: '商品配料'},
  {key: '232210', value: '配方加工'},
  {key: '122210', value: '普通商品'},
  {key: '922100', value: '套餐商品'},
]
class EmodelForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: {
        pageNumber: 1,
        pageSize: 15,
        startDate: '',
        endDate: '',
        condition: {
          groupFlag: 0,
          skuCode: '',
          skuName: '',
          skuTypeId:''
        }
      },
      shopId: '',
      submiting:false,
      detailFetching: false,
      listFetching: false,
      listData: {},
      keyStateList:[],
      keysArray: [],
      valsArray: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getGoodsList = this.getGoodsList.bind(this)
    this.valueChanged = this.valueChanged.bind(this)
    this.queryList = this.queryList.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.queryChange = this.queryChange.bind(this)
  }

  componentDidMount () {
    this.queryList()
  }

  // getGoodsList () {
  //   const { dispatch } = this.props;
  //   const { queryParam } = this.state
  
  //   dispatch({
  //     type: `${namespace}/search`,
  //     payload: queryParam
  //   });

  //   const { doRequest } = this.props
  //   this.setState({listFetching: true})
  //   doRequest('goodsList', query, (data, error) => {
  //     this.setState({listFetching: false})
  //     if (!error) {
  //       this.setState({listData: data})
  //     }
  //   })
  // }

  /* 列表初始化 */
  queryList() {
    const { dispatch } = this.props;
    const { queryParam } = this.state
  
    dispatch({
      type: `${namespace}/search`,
      payload: queryParam
    });
  }

  valueChanged(key, value) {
    let obj = {}
    obj[`${key}`] = value
    this.setState(obj)
  }

  queryChange (key, val, falg = false) {
    let oldQuery = this.state.query
    if (key == 'date') {
      let date = changeTime(val[0],val[1])
      this.setState({
        query: Object.assign({}, oldQuery, {
          startDate: date[0],
          endDate: date[1],
          pageNumber: 1
        })
      })
    } else {
      if(falg){
        oldQuery.pageNumber = 1
        oldQuery.condition[key] = val
        this.setState({query: oldQuery})
      } else {
        let tmpObj = {pageNumber: 1}
        tmpObj[key] = val
        this.setState({query: Object.assign({}, oldQuery, tmpObj)})
      }
    }
  }

  handleSubmit () {
    // this.setState({submiting: false})
    // message.info('添加成功！')
    const {doRequest, onSubmitOk} = this.props
    const {valsArray, shopId} = this.state
    if (!shopId) {
      message.error('请先选择门店')
      return
    }
    let subVal = valsArray.map((item)=>{
      return {
        shopMapId: shopId,
        skuGoodsId: item.skuGoodsId,
      }
    })
    
    doRequest('skuStockAdd', subVal, (data, error) => {
      this.setState({submiting: false})
      if (!error) {
        message.info('添加成功！')
        onSubmitOk()
      }
    })
  }

  queryList () {
    const { query } = this.state
    const { doRequest } = this.props
    this.setState({listFetching: true})
    doRequest('goodsList', query, (data, error) => {
      //if (!this._isMounted) return false
      this.setState({listFetching: false})
      if (!error) {
        this.setState({listData: data})
      }
    })
  }

  //选择
  checkChoose = (target) => {
     const { keysArray } = this.state
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
    this.setState({ valsArray: valsArray.filter(item => item.key !== key) });
   
    let keyIndex = keysArray.indexOf(key);
    if (keyIndex != -1) {
      keysArray.splice(keyIndex, 1);
      this.setState({
        keysArray: keysArray
      })
    }
  }

  render () {
    const { closeModel} = this.props
    const { detailFetching, listFetching, listData, query, submiting, valsArray } = this.state
    const columns_1 = [{
      title: '问题内容',
      dataIndex: 'problem_title',
      key: 'problem_title'
    }, {
      title: '操作',
      key: 'action',
      className: 'table_c',
      render: (text, record) => {
        return (
          <div>
            {this.checkChoose(record.skuGoodsId)
              ?
              <a style={{color:'#ccc'}}>已选择</a>
              :
              <a onClick={()=>{this.addItem(record.skuGoodsId, record)}}>选择</a>
            }
          </div>
        )
      }
    }]

    const columns_2 = [{
      title: '名称',
      dataIndex: 'problem_title',
      key: 'problem_title'
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

    const tablePagination = {
      total: listData.totalRow || 0,
      current: query.pageNumber,
      pageSize: query.pageSize,
      onChange: pageNumber => {
        this.setState({query: Object.assign({}, query, {pageNumber: pageNumber})}, this.queryList)
      }
    }

    let tableData = null
    let list = listData.list
    if (list) {
      tableData = list.map((item, idx) => {
        const {
          problem_id,
          problem_title,
        } = item

        return {
          key: problem_id,
          problem_title,
        }
      })
    }

    return (
      <div className="tkcommon" style={{ height: webConfig.middleMask.height, paddingTop: '10px' }}>
        <div>
          <Row>
            <Col span={16} style={{borderRight: '1px solid #ccc'}}>
              <div className='search clearfix' style={{padding: '10px'}}>
                <div className="kuai">
                  <span className="span">编号/条码 :</span>
                  <Input className="w160" maxLength='20' placeholder='请输入编号/条码' onChange={event => this.queryChange('skuCode', event.target.value, true)} />
                </div>

                <div className="kuai">
                  <span className="span">商品名称 :</span>
                  <Input className="w160" maxLength='20' placeholder='选择商品名称' onChange={event => this.queryChange('skuName', event.target.value, true)} />
                </div>

                <div className="kuai">
                  <span className="span">商品类型:</span>
                  <StatusSelect size="large" options={skuTypeList} style={{width: '140px'}} placeholder='请输入商品类型' onChange={event => this.queryChange('skuTypeId', event, true)} />
                </div>
                
                <Button style={{top: 50,right: 'auto'}} className='searchbut' type='primary' icon='search' onClick={this.queryList}> 查询 </Button>
              </div>

              <div style={{padding: '10px'}}>
                <Spin spinning={detailFetching || listFetching}>                
                  <Table columns={columns_1} dataSource={tableData} pagination={tablePagination} bordered={true}/>
                </Spin>
              </div>
            </Col>
            <Col span={8} style={{padding: '10px'}}>
              <div className='search clearfix'>
                <div className="kuai">
                  <span className="span">选择门店 :</span>
                  <ShopSelect
                    zzdStyle={{ width: 210 }}
                    placeholder='请选择所在门店'
                    onChange={ (id) => {this.valueChanged('shopId', id) } }
                  />
                </div>
              </div>
              <div style={{paddingTop: '10px'}}>
                <Table columns={columns_2} dataSource={valsArray} pagination={false} bordered={true}/>
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
          <Spin spinning={submiting}>
            <Button icon='close' onClick={() => {closeModel()}}>取消</Button>
            <Button icon='check' type='primary' onClick={()=>this.handleSubmit()}>确认</Button>
          </Spin>
        </div>
      </div>
    )
  }
}
const EditForm = Form.create()(EmodelForm)
export default EditFormimport {Component} from 'react'
import webConfig from 'utils/webConfig'
import React from 'react'
import {Button, Spin, Table, Modal, Form, Input, message, Row, Col, Radio, Icon} from 'antd'
import ShopSelect from 'commons/components/TkShopSelect'
import { covertMoney, covertMoney2Yuan } from 'utils/core'
import StatusSelect from 'commons/components/StatusSelect'
const skuTypeList = [
  {key: '210210', value: '商品原料'},
  {key: '231210', value: '商品配料'},
  {key: '232210', value: '配方加工'},
  {key: '122210', value: '普通商品'},
  {key: '922100', value: '套餐商品'},
]
class EmodelForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: {
        pageNumber: 1,
        pageSize: 15,
        startDate: '',
        endDate: '',
        condition: {
          groupFlag: 0,
          skuCode: '',
          skuName: '',
          skuTypeId:''
        }
      },
      shopId: '',
      submiting:false,
      detailFetching: false,
      listFetching: false,
      listData: {},
      keyStateList:[],
      keysArray: [],
      valsArray: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getGoodsList = this.getGoodsList.bind(this)
    this.valueChanged = this.valueChanged.bind(this)
    this.queryList = this.queryList.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.queryChange = this.queryChange.bind(this)
  }

  componentDidMount () {
    this.queryList()
  }

  getGoodsList () {
    const { query } = this.state
    const { doRequest } = this.props
    this.setState({listFetching: true})
    doRequest('goodsList', query, (data, error) => {
      this.setState({listFetching: false})
      if (!error) {
        this.setState({listData: data})
      }
    })
  }

  valueChanged(key, value) {
    let obj = {}
    obj[`${key}`] = value
    this.setState(obj)
  }

  queryChange (key, val, falg = false) {
    let oldQuery = this.state.query
    if (key == 'date') {
      let date = changeTime(val[0],val[1])
      this.setState({
        query: Object.assign({}, oldQuery, {
          startDate: date[0],
          endDate: date[1],
          pageNumber: 1
        })
      })
    } else {
      if(falg){
        oldQuery.pageNumber = 1
        oldQuery.condition[key] = val
        this.setState({query: oldQuery})
      } else {
        let tmpObj = {pageNumber: 1}
        tmpObj[key] = val
        this.setState({query: Object.assign({}, oldQuery, tmpObj)})
      }
    }
  }

  handleSubmit () {
    // this.setState({submiting: false})
    // message.info('添加成功！')
    const {doRequest, onSubmitOk} = this.props
    const {valsArray, shopId} = this.state
    if (!shopId) {
      message.error('请先选择门店')
      return
    }
    let subVal = valsArray.map((item)=>{
      return {
        shopMapId: shopId,
        skuGoodsId: item.skuGoodsId,
      }
    })
    
    doRequest('skuStockAdd', subVal, (data, error) => {
      this.setState({submiting: false})
      if (!error) {
        message.info('添加成功！')
        onSubmitOk()
      }
    })
  }

  queryList () {
    const { query } = this.state
    const { doRequest } = this.props
    this.setState({listFetching: true})
    doRequest('goodsList', query, (data, error) => {
      //if (!this._isMounted) return false
      this.setState({listFetching: false})
      if (!error) {
        this.setState({listData: data})
      }
    })
  }

  //选择
  checkChoose = (target) => {
     const { keysArray } = this.state
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
    this.setState({ valsArray: valsArray.filter(item => item.key !== key) });
   
    let keyIndex = keysArray.indexOf(key);
    if (keyIndex != -1) {
      keysArray.splice(keyIndex, 1);
      this.setState({
        keysArray: keysArray
      })
    }
  }

  render () {
    const { closeModel} = this.props
    const { detailFetching, listFetching, listData, query, submiting, valsArray } = this.state
    const columns_1 = [{
      title: '问题内容',
      dataIndex: 'problem_title',
      key: 'problem_title'
    }, {
      title: '操作',
      key: 'action',
      className: 'table_c',
      render: (text, record) => {
        return (
          <div>
            {this.checkChoose(record.skuGoodsId)
              ?
              <a style={{color:'#ccc'}}>已选择</a>
              :
              <a onClick={()=>{this.addItem(record.skuGoodsId, record)}}>选择</a>
            }
          </div>
        )
      }
    }]

    const columns_2 = [{
      title: '名称',
      dataIndex: 'problem_title',
      key: 'problem_title'
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

    const tablePagination = {
      total: listData.totalRow || 0,
      current: query.pageNumber,
      pageSize: query.pageSize,
      onChange: pageNumber => {
        this.setState({query: Object.assign({}, query, {pageNumber: pageNumber})}, this.queryList)
      }
    }

    let tableData = null
    let list = listData.list
    if (list) {
      tableData = list.map((item, idx) => {
        const {
          problem_id,
          problem_title,
        } = item

        return {
          key: problem_id,
          problem_title,
        }
      })
    }

    return (
      <div className="tkcommon" style={{ height: webConfig.middleMask.height, paddingTop: '10px' }}>
        <div>
          <Row>
            <Col span={16} style={{borderRight: '1px solid #ccc'}}>
              <div className='search clearfix' style={{padding: '10px'}}>
                <div className="kuai">
                  <span className="span">编号/条码 :</span>
                  <Input className="w160" maxLength='20' placeholder='请输入编号/条码' onChange={event => this.queryChange('skuCode', event.target.value, true)} />
                </div>

                <div className="kuai">
                  <span className="span">商品名称 :</span>
                  <Input className="w160" maxLength='20' placeholder='选择商品名称' onChange={event => this.queryChange('skuName', event.target.value, true)} />
                </div>

                <div className="kuai">
                  <span className="span">商品类型:</span>
                  <StatusSelect size="large" options={skuTypeList} style={{width: '140px'}} placeholder='请输入商品类型' onChange={event => this.queryChange('skuTypeId', event, true)} />
                </div>
                
                <Button style={{top: 50,right: 'auto'}} className='searchbut' type='primary' icon='search' onClick={this.queryList}> 查询 </Button>
              </div>

              <div style={{padding: '10px'}}>
                <Spin spinning={detailFetching || listFetching}>                
                  <Table columns={columns_1} dataSource={tableData} pagination={tablePagination} bordered={true}/>
                </Spin>
              </div>
            </Col>
            <Col span={8} style={{padding: '10px'}}>
              <div className='search clearfix'>
                <div className="kuai">
                  <span className="span">选择门店 :</span>
                  <ShopSelect
                    zzdStyle={{ width: 210 }}
                    placeholder='请选择所在门店'
                    onChange={ (id) => {this.valueChanged('shopId', id) } }
                  />
                </div>
              </div>
              <div style={{paddingTop: '10px'}}>
                <Table columns={columns_2} dataSource={valsArray} pagination={false} bordered={true}/>
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
          <Spin spinning={submiting}>
            <Button icon='close' onClick={() => {closeModel()}}>取消</Button>
            <Button icon='check' type='primary' onClick={()=>this.handleSubmit()}>确认</Button>
          </Spin>
        </div>
      </div>
    )
  }
}
const EditForm = Form.create()(EmodelForm)
export default EditForm