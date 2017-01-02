import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, Modal, Select, Row, Col } from 'antd';

import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class AccountEditParameterForm extends EditComponent {
  getParameterTypeByLink = (link) => {
    let newParameterType = { code: null };
    if (this.props.parameterTypes && this.props.parameterTypes.content) {
      newParameterType = this.props.parameterTypes.content.filter(parameterType => this.getLink(parameterType) === link)[0];
    }
    return newParameterType;
  }
  onOkFormParameterEdit = () => {
    this.props.form.validateFields((error, values) => {
      if (!error && !this.props.isLoading) {
        const newValues = values;
        newValues.parameterType = this.getParameterTypeByLink(values.parameterType);
        this.props.onOkFormParameterEdit(newValues);
        this.props.form.resetFields();
      }
    });
  };
  onCancelFormParameterEdit = () => {
    this.props.form.resetFields();
    this.props.onCancelFormParameterEdit();
  };
  onParameterTypeChange = (value) => {
    if (this.getParameterTypeByLink(value).code === '01') {
      this.props.form.setFieldsValue({ value: 0 });
    } else {
      this.props.form.setFieldsValue({ value: '' });
    }
  }
  render() {
    const object = this.props.parameter;
    const titleItem = this.props.id ? <FormattedMessage id="editPageEditTitle" /> : <FormattedMessage id="editPageCreateTitle" />;
    const baseFields = this.getBaseFields(object);
    let parameterTypeList = null;
    if (this.props.parameterTypes && this.props.parameterTypes.content) {
      parameterTypeList = this.props.parameterTypes.content.map(parameterType => (
        <Select.Option key={parameterType.id} value={this.getLink(parameterType)}>{parameterType.name}</Select.Option>
      ));
      if (!this.props.id) {
        object.parameterType = this.props.parameterTypes.content[0];
      }
    }
    let fieldValue = this.getInputNumberField('value', parseFloat(object.value), 0.1);
    if (this.props.form.getFieldValue('parameterType')) {
      if (this.getParameterTypeByLink(this.props.form.getFieldValue('parameterType')).code !== '01') {
        fieldValue = this.getInputNumberField('value', parseInt(object.value, 1));
      }
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
            {this.getSelectWithSearchField('parameterType', this.getLink(object.parameterType), parameterTypeList, this.onParameterTypeChange)}
          </FormItem>
          <FormItem label={this.props.intl.messages.commonFieldValue}>
            {fieldValue}
          </FormItem>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <FormItem label={this.props.intl.messages.commonFieldDateStart}>
                {this.getDateField('dateStart', object.dateStart)}
              </FormItem>
            </Col>
            <Col className="gutter-row" span={12}>
              <FormItem label={this.props.intl.messages.commonFieldDateEnd}>
                {this.getDateField('dateEnd', object.dateEnd, false)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(injectIntl(AccountEditParameterForm));
