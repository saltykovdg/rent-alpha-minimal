import React from 'react';
import { injectIntl } from 'react-intl';
import { Form, Modal } from 'antd';

import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class AccountAddPaymentForm extends EditComponent {
  onOk = () => {
    this.props.form.validateFields((error, values) => {
      if (!error && values.value > 0) {
        this.props.onOkFormAddPayment(values.value);
      }
    });
  };
  onCancel = () => {
    this.props.onCancelFormAddPayment();
  };
  afterClose = () => {
    this.props.form.resetFields();
  }
  render() {
    return (
      <Modal
        visible={this.props.formAddPaymentVisible}
        title={this.props.intl.messages.formAddPaymentTitle}
        okText={this.props.intl.messages.buttonAdd}
        onOk={this.onOk}
        onCancel={this.onCancel}
        afterClose={this.afterClose}
        closable={false}
        maskClosable={false}
      >
        <Form layout="horizontal">
          <FormItem label={this.props.intl.messages.paymentFieldSum}>
            {this.getInputNumberField('value', 0, 0.1)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(injectIntl(AccountAddPaymentForm));
