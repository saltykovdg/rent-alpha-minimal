import React from 'react';
import { injectIntl } from 'react-intl';
import { Form, Modal, Select, Alert } from 'antd';

import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class AccountAddRecalculationForm extends EditComponent {
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
        if (values.value === 0) {
          this.showValueError(true);
        } else {
          this.props.onOkFormAddRecalculation(values.accountServiceId, values.value, values.note);
        }
      }
    });
  };
  onCancel = () => {
    this.props.onCancelFormAddRecalculation();
  };
  afterClose = () => {
    this.props.form.resetFields();
    this.showValueError(false);
  }
  render() {
    const object = this.props.data;
    let accountServicesDataSource = [];
    if (object && object.services && object.services.length > 0) {
      accountServicesDataSource = this.getListForPeriod(object.services, this.props.currentWorkingPeriod).sort((a, b) => {
        return a.service.name.localeCompare(b.service.name);
      });
      accountServicesDataSource = accountServicesDataSource.map(accountService => (
        <Select.Option key={accountService.id} value={accountService.id}>{accountService.service.name}</Select.Option>
      ));
    }
    return (
      <Modal
        visible={this.props.formAddRecalculationVisible}
        title={this.props.intl.messages.formAddRecalculationTitle}
        okText={this.props.intl.messages.buttonAddRecalculation}
        onOk={this.onOk}
        onCancel={this.onCancel}
        afterClose={this.afterClose}
        closable={false}
        maskClosable={false}
      >
        <Form layout="horizontal">
          {this.state.valueError ? <Alert message={this.props.intl.messages.recalculationValueErrorTitle} type="error" /> : null}
          <FormItem label={this.props.intl.messages.serviceFieldName}>
            {this.getSelectWithSearchField('accountServiceId', null, accountServicesDataSource)}
          </FormItem>
          <FormItem label={this.props.intl.messages.commonFieldNote}>
            {this.getInputField('note', '')}
          </FormItem>
          <FormItem label={this.props.intl.messages.commonFieldSum}>
            {this.getInputNumberField('value', 0, 0.1)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(injectIntl(AccountAddRecalculationForm));
