import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, Modal, Select, Row, Col, Spin } from 'antd';

import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class AccountEditServiceForm extends EditComponent {
  onServiceChange = (value) => {
    const object = this.props.services.content.filter(service => this.getLink(service) === value)[0];
    this.props.tariffs.content = null;
    this.props.service.tariff = null;
    this.props.form.resetFields(['tariff']);
    this.props.onServiceChange(object.id);
  }
  onOkFormServiceEdit = () => {
    this.props.form.validateFields((error, values) => {
      if (!error && !this.props.isLoading) {
        const newValues = values;
        newValues.service = this.props.services.content.filter(service => this.getLink(service) === values.service)[0];
        newValues.tariff = this.props.tariffs.content.filter(tariff => this.getLink(tariff) === values.tariff)[0];
        this.props.onOkFormServiceEdit(newValues);
        this.props.tariffs.content = null;
        this.props.service.tariff = null;
        this.props.form.resetFields();
      }
    });
  };
  onCancelFormServiceEdit = () => {
    this.props.onCancelFormServiceEdit();
    this.props.tariffs.content = null;
    this.props.service.tariff = null;
    this.props.form.resetFields();
  };
  render() {
    const object = this.props.service;
    const titleItem = object && object.id ? <FormattedMessage id="editPageEditTitle" /> : <FormattedMessage id="editPageCreateTitle" />;
    const baseFields = this.getBaseFields(object);
    let serviceList = null;
    if (this.props.services && this.props.services.content) {
      serviceList = this.props.services.content.map(service => (
        <Select.Option key={service.id} value={this.getLink(service)}>{service.name}</Select.Option>
      ));
    }
    let tariffList = null;
    if (this.props.tariffs && this.props.tariffs.content && this.props.tariffs.content.length > 0) {
      tariffList = this.props.tariffs.content.map(tariff => (
        <Select.Option key={tariff.id} value={this.getLink(tariff)}>{tariff.name}</Select.Option>
      ));
      if (!this.props.form.getFieldValue('tariff')) {
        object.tariff = this.props.tariffs.content[0];
      }
    }
    return (
      <Modal
        visible={this.props.formServiceEditVisible}
        title={titleItem}
        okText={this.props.service && this.props.service.id ? this.props.intl.messages.buttonApply : this.props.intl.messages.buttonAdd}
        onOk={this.onOkFormServiceEdit}
        onCancel={this.onCancelFormServiceEdit}
        closable={false}
        maskClosable={false}
      >
        <Spin spinning={this.props.isLoading}>
          <Form layou="horizontal">
            {baseFields}
            <FormItem label={this.props.intl.messages.serviceFieldName}>
              {this.getSelectWithSearchField('service', this.getLink(object.service), serviceList, this.onServiceChange)}
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
            <FormItem label={this.props.intl.messages.tariffFieldName}>
              {this.getSelectWithSearchField('tariff', this.getLink(object.tariff), tariffList)}
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

export default Form.create()(injectIntl(AccountEditServiceForm));
