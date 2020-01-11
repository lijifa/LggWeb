import React, { Component, Fragment } from 'react';
import { Upload, Icon, Button } from 'antd';
import styles from './index.less';
import headImg from '@/assets/icon_head.png';
import itemImg from '@/assets/icon_empty.png';
const { Dragger } = Upload;
export default class MSupload extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        avatar: this.props.imgPath ? this.props.imgPath : (this.props.defaultFlag=='item') ? itemImg : headImg,
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.imgPath != this.props.imgPath) {
            this.setState({
                avatar: nextProps.imgPath
            })
        }
    }

    onChange (e) {
        let res = e.file
        console.log('===========res');
        console.log(res);
        if (res.status == 'done' && res.response.code=='00') {
            let src = res.response.data
            this.setState({
                avatar: src
            }, ()=>{
                if (typeof this.props.onChange === 'function') {
                    this.props.onChange(this.state.avatar)
                }
            })
        }
    }
    // 设置默认头像
    // defaultErrorAvatar () {
    //     this.setState({
    //         avatar: headImg
    //     })
    // }

    // 头像组件 方便以后独立，增加裁剪之类的功能
    render() {
       // const { avatar } = this.state;
        
        return (
            <Fragment>
                {/* <Upload
                    action ='/admin/rule/uploadFiles'
                    onChange={(e)=>this.onChange(e)}
                    showUploadList={false}
                >
                    <div className={styles.avatar}>
                        <img src={avatar} onError={()=>this.defaultErrorAvatar()} alt="avatar" />
                    </div>
                </Upload> */}

                <Dragger 
                    name = 'file'
                    //</Fragment>multiple = true,
                    action = '/admin/rule/uploadFiles'
                    onChange={(e)=>this.onChange(e)}
                    
                >
                    <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">点击或拖拽到此区域上传</p>
                    <p className="ant-upload-hint">
                    用于上传小程序，答案中的音频部分，目前仅限单次上传且容量需小于3M
                    </p>
                </Dragger>
            </Fragment>
        );
    }
}