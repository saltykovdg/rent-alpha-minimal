import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, Input, Modal, Select } from 'antd';

import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class AccountEditParameterForm extends EditComponent {
  onOkFormParameterEdit = () => {
    this.props.form.validateFields((error, values) => {
      if (!error && !this.props.isLoading) {
        this.props.form.resetFields();
        this.props.onOkFormParameterEdit(values);
      }
    });
  };
  onCancelFormParameterEdit = () => {
    this.props.form.resetFields();
    this.props.onCancelFormParameterEdit();
  };
  render() {
    const object = this.props.parameter;
    const titleItem = object && object.id ? <FormattedMessage id="editPageEditTitle" /> : <FormattedMessage id="editPageCreateTitle" />;
    const baseFields = this.getBaseFields(object);
    let parameterTypeList = null;
    if (this.props.parameterTypes && this.props.parameterTypes.content) {
      parameterTypeList = this.props.parameterTypes.content.map(parameterType => (
        <Select.Option key={parameterType.id} value={this.getLink(parameterType)}>{parameterType.name}</Select.Option>
      ));
    }
    return (
      <Modal
        visible={this.props.formParameterEditVisible}
        title={titleItem}
        okText={this.props.intl.messages.buttonSave}
        onOk={this.onOkFormParameterEdit}
        onCancel={this.onCancelFormParameterEdit}
        closable={false}
        maskClosable={false}
      >
        <Form vertical>
          {baseFields}
          <FormItem label={this.props.intl.messages.parameterTypeFieldName}>
            {this.getSelectWithSearchField('parameterType', this.getLink(object.parameterType), parameterTypeList)}
          </FormItem>
          <FormItem label={this.props.intl.messages.parameterFieldValue}>
            {this.getInputNumberField('value', object.value, 0.1)}
          </FormItem>
          <FormItem label={this.props.intl.messages.parameterFieldDateStart}>
            {this.getDateField('dateStart', object.dateStart)}
          </FormItem>
          <FormItem label={this.props.intl.messages.parameterFieldDateEnd}>
            {this.getDateField('dateEnd', object.dateEnd, false)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(injectIntl(AccountEditParameterForm));
