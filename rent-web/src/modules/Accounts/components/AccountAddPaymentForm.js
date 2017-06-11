import React from 'react';
import { injectIntl } from 'react-intl';
import { Form, Modal, Alert } from 'antd';

import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class AccountAddPaymentForm extends EditComponent {
  constructor(props, context) {
    super(props, context);
    this.showValueError(false);
  }
  showValueError = (visible) => {
    this.state = { valueError: visible };
  }
  onOk = () => {
    this.props.form.validateFields((error, values) => {
      if (!error) {
        if (values.value <= 0) {
          this.showValueError(true);
        } else {
          this.props.onOkFormAddPayment(values.value);
        }
      }
    });
  };
  onCancel = () => {
    this.props.onCancelFormAddPayment();
  };
  afterClose = () => {
    this.props.form.resetFields();
    this.showValueError(false);
  }
  render() {
    return (
      <Modal
        visible={this.props.formAddPaymentVisible}
        title={this.props.intl.messages.formAddPaymentTitle}
        okText={this.props.intl.messages.buttonAddPayment}
        onOk={this.onOk}
        onCancel={this.onCancel}
        afterClose={this.afterClose}
        closable={false}
        maskClosable={false}
      >
        <Form layout="horizontal">
          {this.state.valueError ? <FormItem><Alert message={this.props.intl.messages.paymentValueErrorTitle} type="error" /></FormItem> : null}
          <FormItem label={this.props.intl.messages.commonFieldSum}>
            {this.getInputNumberField('value', 0, 0.1)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(injectIntl(AccountAddPaymentForm));
