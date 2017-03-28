import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, Modal, Select, Row, Col } from 'antd';

import { EditComponent } from './../../../components/EditComponent';
import * as ParameterType from './../../../util/ParameterType';

const FormItem = Form.Item;

class AccountEditParameterForm extends EditComponent {
  getParameterTypeByLink = (link) => {
    let newParameterType = { code: null };
    if (this.props.parameterTypes && this.props.parameterTypes.content) {
      newParameterType = this.props.parameterTypes.content.filter(parameterType => this.getLink(parameterType) === link)[0];
    }
    return newParameterType;
  }
  onOk = () => {
    this.props.form.validateFields((error, values) => {
      if (!error && !this.props.isLoading) {
        const newValues = values;
        newValues.parameterType = this.getParameterTypeByLink(values.parameterType);
        if (newValues.parameterType.code === ParameterType.TOTAL_AREA_CODE) {
          newValues.value = newValues.value_float;
        } else {
          newValues.value = newValues.value_text;
        }
        this.props.onOkFormParameterEdit(newValues);
      }
    });
  }
  onCancel = () => {
    this.props.onCancelFormParameterEdit(this.props.parameter);
  }
  afterClose = () => {
    this.props.form.resetFields();
  }
  onParameterTypeChange = (value) => {
    this.props.parameter.parameterType = this.getParameterTypeByLink(value);
    if (this.props.parameter.parameterType.code === ParameterType.TOTAL_AREA_CODE) {
      this.props.parameter.value = 0;
    } else {
      this.props.parameter.value = '';
    }
  }
  render() {
    const object = this.props.parameter;
    const titleItem = object && object.id ? <FormattedMessage id="editPageEditParameterTypeOnAccountTitle" /> : <FormattedMessage id="editPageAddParameterTypeOnAccountTitle" />;
    const baseFields = this.getBaseFields(object);
    let parameterTypeList = null;
    if (this.props.parameterTypes && this.props.parameterTypes.content) {
      parameterTypeList = this.props.parameterTypes.content.map(parameterType => (
        <Select.Option key={parameterType.id} value={this.getLink(parameterType)}>{parameterType.name}</Select.Option>
      ));
      if (object && !object.id && !object.parameterType.id) {
        object.parameterType = this.props.parameterTypes.content[0];
      }
    }
    const fieldInputNumberValue = this.getInputNumberField('value_float', object.value ? parseFloat(object.value) : 0, 0.1);
    const fieldInputValue = this.getInputField('value_text', object.value === 0 ? '-' : object.value);
    const fieldValue = object.parameterType.code === ParameterType.TOTAL_AREA_CODE ? fieldInputNumberValue : fieldInputValue;
    return (
      <Modal
        visible={this.props.formParameterEditVisible}
        title={titleItem}
        okText={object && object.id ? this.props.intl.messages.buttonApply : this.props.intl.messages.buttonAdd}
        onOk={this.onOk}
        onCancel={this.onCancel}
        afterClose={this.afterClose}
        closable={false}
        maskClosable={false}
      >
        <Form layout="horizontal">
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
