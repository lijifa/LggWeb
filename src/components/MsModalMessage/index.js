import React, { Component } from 'react'
import { Modal, Button, Avatar } from 'antd'

export default class MsShopSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: this.props.messageVisible ? true : false
    }
  }

  componentDidMount() {
    // console.log(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messageVisible != this.props.messageVisible) {
      this.setModalMessage()
    }
  }

  /* 设置显示图标 */
  iconType () {
    const {iconType} = this.props
    let flag = iconType || 'success'
    let iconPath = '/success.png'
    switch (flag) {
      case 'success':
        iconPath = '/success.png'
        break;
      case 'error':
        iconPath = '/error.png'
        break;
      case 'warning':
        iconPath = '/warning.png'
        break;
    }
    return iconPath
  }

  /* 设置显示/关闭 */
  setModalMessage() {
    const { times } = this.props
    let countDownTime = times ? times * 1000 : 2000
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible
    })

    setTimeout(() => this.setModalMessage(), countDownTime)
  }

  render() {
    const { modalVisible } = this.state
    const { context } = this.props
    console.log('context============')
    console.log(this.props)
    console.log(context, modalVisible, this.props.messageVisible)
    return (
      <Modal
        centered={true}
        visible={modalVisible}
        bodyStyle={{textAlign:'center'}}
        destroyOnClose={true}
        width={320}
        height={440}
        footer={null}
        onCancel={()=>{this.setModalMessage()}}
      >
      <Avatar size={64} src={this.iconType()}/>
      <p> </p>
      <p style={{
         fontSize: '40px',
         fontWeight: 'bold',
         margin: '40px 0'
      }}>{context}</p>
      <Button type="primary" style={{width:'50%', height:'40px'}} onClick={()=>this.setModalMessage()}>关闭</Button>
    </Modal>
    )
  }
}