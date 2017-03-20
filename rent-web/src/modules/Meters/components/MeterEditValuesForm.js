import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, Modal, Row, Col, Input } from 'antd';

import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class MeterEditValuesForm extends EditComponent {
  onOkFormMeterValueEdit = () => {
    this.props.form.validateFields((error, values) => {
      if (!error && !this.props.isLoading) {
        this.props.onOkFormMeterValueEdit(values);
        this.props.form.resetFields();
      }
    });
  };
  onCancelFormMeterValueEdit = () => {
    this.props.form.resetFields();
    this.props.onCancelFormMeterValueEdit();
  };
  render() {
    const object = this.props.meterValue;
    const titleItem = object && object.id ? <FormattedMessage id="editPageEditTitle" /> : <FormattedMessage id="editPageCreateTitle" />;
    const baseFields = this.getBaseFields(object);
    baseFields.push(this.getBaseFormField('consumption', object.consumption, <Input key="consumption" type="hidden" />));
    return (
      <Modal
        visible={this.props.formMeterValueEditVisible}
        title={titleItem}
        okText={object && object.id ? this.props.intl.messages.buttonApply : this.props.intl.messages.buttonAdd}
        onOk={this.onOkFormMeterValueEdit}
        onCancel={this.onCancelFormMeterValueEdit}
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
