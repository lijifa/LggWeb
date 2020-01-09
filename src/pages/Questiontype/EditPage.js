import { Component } from 'react';
import { connect } from 'dva';
import { Form, Button, Input } from 'antd';
import {responseMsg} from '@/utils/utils';
import styles from './styles.less';
import StatusSelect from '@/components/MsStatusSelect';
const flagSelect =  [
  {key: 0, value: '开启'},
  {key: 1, value: '关闭'}
]
const FormItem = Form.Item;

const namespace = 'questiontype';
const mapStateToProps = (state) => {
  const result = state[namespace].editRes;
  return {
    result
  };
};
@connect(mapStateToProps)

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
            <FormItem label='标题'>
              {getFieldDecorator('typename', Object.assign({}, decoratorConfig, {initialValue: detailData ? detailData.typename : ''}))
              (<Input placeholder='请输入标题' />)}
            </FormItem>
            <FormItem label='问题个数'>
              {getFieldDecorator('qsnum', Object.assign({}, decoratorConfig, {initialValue: detailData ? detailData.qsnum : 0}))
              (<Input placeholder='请输入问题个数' />)}
            </FormItem>

            <FormItem label='价格'>
              {getFieldDecorator('price', Object.assign({}, decoratorConfig, {initialValue: detailData ? detailData.price : '0.00'}))
              (<Input placeholder='请输入价格' />)}
            </FormItem>
            <FormItem label='状态'>
              {getFieldDecorator('state', Object.assign({}, decoratorConfig, {initialValue: detailData ? detailData.state : 0}))
              (<StatusSelect options={flagSelect} placeholder="请选择状态" />)}
            </FormItem>
            <FormItem label='备注'>
              {getFieldDecorator('introduce', Object.assign({}, '', {initialValue: detailData ? detailData.introduce : ''}))
              (<Input.TextArea rows={4} placeholder='在这里添加描述内容' />)}
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