import React, { Component, Fragment } from 'react';
import { Upload,Button } from 'antd';
import { FormattedMessage } from 'umi/locale';
import styles from './index.less';
import headImg from '@/assets/icon_head.png';
import itemImg from '@/assets/icon_empty.png';
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
        
        if (res.status == 'done' && res.response.code=='00') {
            let src = res.response.data.src
            this.setState({
                avatar: UPLOAD_URL+src
            }, ()=>{
                if (typeof this.props.onChange === 'function') {
                    this.props.onChange(this.state.avatar)
                }
            })
        }
    }
    // 设置默认头像
    defaultErrorAvatar () {
        this.setState({
            avatar: headImg
        })
    }

    // 头像组件 方便以后独立，增加裁剪之类的功能
    render() {
        const { avatar } = this.state;
        
        return (
            <Fragment>
                <Upload
                    action ='/cmbc/user/uploadImage'
                    onChange={(e)=>this.onChange(e)}
                    showUploadList={false}
                >
                    <div className={styles.avatar}>
                        {/*<Avatar size={114} src={avatar} onError={()=>this.defaultErrorAvatar()} />*/}
                        <img src={avatar} onError={()=>this.defaultErrorAvatar()} alt="avatar" />
                    </div>
                </Upload>
            </Fragment>
        );
    }
}