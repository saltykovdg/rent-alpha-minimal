import React from 'react';
import { injectIntl } from 'react-intl';
import { Form, Modal, Row, Col, Select, Alert } from 'antd';

import { EditComponent } from './EditComponent';

const FormItem = Form.Item;

class CalculationForm extends EditComponent {
  constructor(props, context) {
    super(props, context);
    this.showPeriodError(false);
  }
  showPeriodError = (showPeriodError) => {
    this.state = { showPeriodError };
  }
  onOk = () => {
    this.props.form.validateFields((error, values) => {
      if (!error) {
        const newObject = {
          periodStart: this.props.workingPeriods.content.filter(workingPeriod => this.getLink(workingPeriod) === values.periodStart)[0],
          periodEnd: this.props.workingPeriods.content.filter(workingPeriod => this.getLink(workingPeriod) === values.periodEnd)[0],
        };
        const periodStart = new Date(newObject.periodStart.dateStart).getTime();
        const periodEnd = new Date(newObject.periodEnd.dateStart).getTime();
        if (periodStart <= periodEnd) {
          this.props.onOkFormCalculation(newObject);
        } else {
          this.showPeriodError(true);
        }
      }
    });
  }
  onCancel = () => {
    this.props.onCancelFormCalculation();
  }
  afterClose = () => {
    this.props.form.resetFields();
    this.showPeriodError(false);
  }
  render() {
    const currentWorkingPeriod = this.props.currentWorkingPeriod;
    let workingPeriodsList = null;
    if (this.props.workingPeriods && this.props.workingPeriods.content) {
      workingPeriodsList = this.props.workingPeriods.content.map(workingPeriod => (
        <Select.Option key={workingPeriod.id} value={this.getLink(workingPeriod)}>{workingPeriod.name}</Select.Option>
      ));
    }
    return (
      <Modal
        visible={this.props.formCalculationVisible}
        title={this.props.title}
        okText={this.props.intl.messages.buttonExecuteCalculation}
        onOk={this.onOk}
        onCancel={this.onCancel}
        afterClose={this.afterClose}
        closable={false}
        maskClosable={false}
      >
        <Form layout="horizontal">
          {this.state.showPeriodError ? <Alert message={this.props.intl.messages.periodStartEndErrorTitle} type="error" /> : null}
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <FormItem label={this.props.intl.messages.commonFieldPeriodStart}>
                {this.getSelectField('periodStart', workingPeriodsList ? currentWorkingPeriod : null, workingPeriodsList, () => {}, false)}
              </FormItem>
            </Col>
            <Col className="gutter-row" span={12}>
              <FormItem label={this.props.intl.messages.commonFieldPeriodEnd}>
                {this.getSelectField('periodEnd', workingPeriodsList ? currentWorkingPeriod : null, workingPeriodsList, () => {}, false)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(injectIntl(CalculationForm));
