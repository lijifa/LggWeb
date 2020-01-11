import { Component } from 'react';
import { connect } from 'dva';
import { Form, Button, Input, Modal, message } from 'antd';
import {responseMsg} from '@/utils/utils';
import styles from './styles.less';
import StatusSelect from '@/components/MsStatusSelect';
import ChooseQsPage from './ChooseQsPage';
import QuestionTypeSelect from '@/components/MsQuestionTypeSelect';
import UploadFiles from '@/components/LggUploadFiles';
const typeSelect =  [
  {key: 0, value: '总分'},
  {key: 1, value: '分项分'},
]
const FormItem = Form.Item;

const namespace = 'scoreRule';
const mapStateToProps = (state) => {
  const result = state[namespace].editRes;
  return {
    result
  };
};
@connect(mapStateToProps)

class EditPage extends Component {
  state = {
    choosQsKey: this.props.detailData ? this.props.detailData.nums.split(',') : [],
    ids: this.props.detailData ? this.props.detailData.nums : '',
    qs_no: this.props.detailData ? this.props.detailData.qs_no : '',
    tid: this.props.detailData ? this.props.detailData.question_type_id : '',
    editModel: false,
    audio_path: this.props.detailData ? this.props.detailData.audio_path : ''
  };
  handleSubmit = e => {
    e.preventDefault();

    const { dispatch, form, detailData, onReturnList } = this.props;
    const { tid, ids, qs_no, audio_path } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        id: detailData ? detailData.id : '',
        question_type_id: tid,
        rule_name: fieldsValue.rule_name,
        score_type: fieldsValue.score_type,
        rule_str: fieldsValue.rule_str,
        nums: ids,
        qs_no: qs_no,
        audio_path: audio_path,
        content_1: fieldsValue.content_1,
        content_2: fieldsValue.content_2,
        content_3: fieldsValue.content_3,
      };
      console.log('values===www======')
      console.log(values)

      dispatch({
        type: detailData ? `${namespace}/update` : `${namespace}/add`,
        payload: values,
        callback: (res) => {
          if (res) {
            if (res.code == '00') {
              responseMsg(res)
              onReturnList()
            }else{
              responseMsg(res)
            }
          }
        }
      });
    });
  };

  //修改分类弹出选择
  choosQstype = (typeId) => {
   console.log('choosQstype ===== typeId')
   console.log(typeId)
   this.setState({
     editModel: true,
     tid: typeId
    })
  }

  //显示弹框
  actionModel = () => {
    let tid = this.state.tid
    if (!tid) {
      message.error('请先选择分类')
      return
    }
    this.setState({editModel: true, dataDetail: null})
  }

  //取消弹框
  eModelCancel = () => {
    this.setState({editModel: false, dataDetail: null})
  }

  //选择后返回收集数据
  choosOptions = (e, k) => {
    console.log('e, k==========')
    console.log(e, k)
    //选择ID
    let chooseTmp=[], chooseVal = ''
    chooseTmp = e.map((item)=>{
      return item.id
    })
    chooseVal = chooseTmp.join(',')

    //选择题号
    let chooseTmp2=[], chooseVal2 = ''
    chooseTmp2 = e.map((item)=>{
      return item.question_no
    })
    chooseVal2 = chooseTmp2.join(',')
    console.log('chooseTmp2')
    console.log(chooseTmp2)
    this.setState({
      ids: chooseVal,
      qs_no: chooseVal2,
      choosQsKey: k
    })
  }

  onChangeFile = (e) => {
    this.setState({
      audio_path: e
    })
  }

  render() {
    const { detailData } = this.props;
    const { ids, choosQsKey, editModel, tid } = this.state;
    const { getFieldDecorator } = this.props.form;
    const decoratorConfig = {
      rules: [{ required: true, message: '此项必填' }]
    }
    return (
      <div className={styles.editFormItem}>
          <Form layout='vertical' onSubmit={this.handleSubmit}>
            <FormItem label='分类'>
              {getFieldDecorator('question_type_id', Object.assign({}, decoratorConfig, {initialValue: detailData ? detailData.question_type_id : ''}))
              (<QuestionTypeSelect placeholder="请选择分类" onChange={(e)=>this.choosQstype(e)}/>)}
            </FormItem>
            <FormItem label='规则名称'>
              {getFieldDecorator('rule_name', Object.assign({}, decoratorConfig, {initialValue: detailData ? detailData.rule_name : ''}))
              (<Input placeholder='请输入规则名称' />)}
            </FormItem>
            <FormItem label=' 修改题号'>
             
              <Button onClick={() => this.actionModel()} style={{disabled: ids ? false : true}}>{ids ? '当前已选择 '+choosQsKey.length : '当前未选择'}</Button>
              
            </FormItem>
            <FormItem label='上传音频'>
              <UploadFiles onChange={(e) => this.onChangeFile(e)}/>
            </FormItem>
            <FormItem label='计分类型'>
              {getFieldDecorator('score_type', Object.assign({}, decoratorConfig, {initialValue: detailData ? detailData.score_type : 1}))
              (<StatusSelect options={typeSelect} placeholder="请选择计分类型" />)}
            </FormItem>

            <FormItem label='核算规则'>
              {getFieldDecorator('rule_str', Object.assign({}, decoratorConfig, {initialValue: detailData ? detailData.rule_str : ''}))
              (<Input placeholder='请输入核算规则' />)}
            </FormItem>
            <FormItem label='简单描述'>
              {getFieldDecorator('content_1', Object.assign({}, decoratorConfig, {initialValue: detailData ? detailData.content_1 : ''}))
              (<Input.TextArea rows={4} placeholder='在这里添加剪短的描述内容（不用给钱就能看的那种）' />)}
            </FormItem>

            <FormItem label='详细描述一'>
              {getFieldDecorator('content_2', Object.assign({}, decoratorConfig, {initialValue: detailData ? detailData.content_2 : ''}))
              (<Input.TextArea rows={4} placeholder='在这里添加描述内容（给了钱以后才能看的那种）' />)}
            </FormItem>

            <FormItem label='详细描述二'>
              {getFieldDecorator('content_3', Object.assign({}, decoratorConfig, {initialValue: detailData ? detailData.content_3 : ''}))
              (<Input.TextArea rows={4} placeholder='在这里添加描述内容（给了钱以后才能看的那种）' />)}
            </FormItem>

          <div
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
            <Button
              style={{
                marginRight: 8,
              }}
              onClick={this.props.onClose}
            >
              取消
            </Button>
            <Button type="primary" htmlType="submit">保存</Button>
          </div>
        </Form>

        <Modal
          title={'选择题目'}
          visible={editModel}
          onCancel={this.eModelCancel}
          width={1000}
          footer={null}
          maskClosable={false}
          destroyOnClose={true}
        >
          {
            <ChooseQsPage
              closeModel={this.eModelCancel}
              onSubmitOk={() => {
                this.eModelCancel()
              }}
              dataDetail={detailData}
              maskClosable={true}
              chooseQsOption= {(e, k) => this.choosOptions(e, k)}
              choosQsKey={choosQsKey}
              tid={tid}
            />
          }
        </Modal>
      </div>
    );
  }
}

const EditFormPage = Form.create()(EditPage);
export default EditFormPage