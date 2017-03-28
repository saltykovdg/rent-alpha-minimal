import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, Modal, Row, Col, Input } from 'antd';

import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class MeterEditValuesForm extends EditComponent {
  onOk = () => {
    this.props.form.validateFields((error, values) => {
      if (!error && !this.props.isLoading) {
        this.props.onOkFormMeterValueEdit(values);
      }
    });
  };
  onCancel = () => {
    this.props.onCancelFormMeterValueEdit(this.props.meterValue);
  };
  afterClose = () => {
    this.props.form.resetFields();
  }
  render() {
    const object = this.props.meterValue;
    const titleItem = object && object.id ? <FormattedMessage id="editPageEditValueOnMeterTitle" /> : <FormattedMessage id="editPageAddValueOnMeterTitle" />;
    const baseFields = this.getBaseFields(object);
    baseFields.push(this.getBaseFormField('consumption', object.consumption, <Input key="consumption" type="hidden" />));
    return (
      <Modal
        visible={this.props.formMeterValueEditVisible}
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
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <FormItem label={this.props.intl.messages.meterFieldValue}>
                {this.getInputNumberField('value', parseFloat(object.value))}
              </FormItem>
            </Col>
            <Col className="gutter-row" span={12}>
              <FormItem label={this.props.intl.messages.meterFieldDateValue}>
                {this.getDateField('dateValue', object.dateValue)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(injectIntl(MeterEditValuesForm));
