import React, { Component } from 'react'
import { connect } from 'dva';
import { Input, Spin } from 'antd'

const Search = Input.Search;

const namespace = 'employee';
const mapStateToProps = (state) => {
    const result = state[namespace].readRes;
    return {
        result
    };
};

//读卡号或二维码
@connect(mapStateToProps)
export default class MsReadCardNo extends Component {
    state = {
        cardNo : '',
    };

    componentDidMount(n) {
        //循环读取卡号
        this.timer = setInterval(
            () => {
                this.readCard()                
            },
            300
        );
    }
    componentWillUnmount() {
        clearInterval(this.timer);
      }
    //访问接口获取卡号或二维码
    readCard() {
        const { dispatch } = this.props;
        dispatch({
          type: `${namespace}/read`,
          payload: {}
        });

    }


    render() {
        let text = this.props.text || '请输入卡号或扫描二维码'
        let data = this.props.result ? this.props.result.data : { cardNo:''}

        if (data != null && data.cardNo != '')
        {
            this.state.cardNo = data.cardNo
        }  
        return (
                <Input                    
                    placeholder = {text}
                    value={this.state.cardNo}
                />
        )
    }
}