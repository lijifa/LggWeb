import { Component } from 'react';
import { connect } from 'dva';
import { Form, Button, Input } from 'antd';
import {responseMsg} from '@/utils/utils';
import styles from './styles.less';
import QuestionTypeSelect from '@/components/MsQuestionTypeSelect';

const FormItem = Form.Item;

const namespace = 'question';
@connect(({ question, loading }) => ({
  //result: question.data,
  dataLoading: loading.effects['question/editRes'] ? true : false,
}))

class EditPage extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form, detailData, onReturnList } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        id: detailData ? detailData.id : ''
      };
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

  render() {
    const { detailData } = this.props;
    const { getFieldDecorator } = this.props.form;
    const decoratorConfig = {
      rules: [{ required: true, message: '此项必填' }]
    }
    return (
      <div className={styles.editFormItem}>
          <Form layout='vertical' onSubmit={this.handleSubmit}>
            <FormItem label='分类问题'>
              {getFieldDecorator('question_type_id', Object.assign({}, decoratorConfig, {initialValue: detailData ? detailData.question_type_id : ''}))
              (<QuestionTypeSelect placeholder="请选择分类问题" />)}
            </FormItem>
            <FormItem label='问题编号'>
              {getFieldDecorator('question_no', Object.assign({}, decoratorConfig, {initialValue: detailData ? detailData.question_no : ''}))
              (<Input placeholder='请输入问题' />)}
            </FormItem>
            <FormItem label='问题标题'>
              {getFieldDecorator('title', Object.assign({}, decoratorConfig, {initialValue: detailData ? detailData.title : ''}))
              (<Input placeholder='请输入问题' />)}
            </FormItem>
            <FormItem label='问题简介'>
              {getFieldDecorator('introduce', Object.assign({}, decoratorConfig, {initialValue: detailData ? detailData.introduce : ''}))
              (<Input.TextArea rows={4} placeholder='在这里添加问题简介' />)}
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
      </div>
    );
  }
}

const EditFormPage = Form.create()(EditPage);
export default EditFormPage