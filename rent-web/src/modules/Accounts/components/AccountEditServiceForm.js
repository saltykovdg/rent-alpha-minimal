import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, Modal, Select, Row, Col } from 'antd';

import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class AccountEditServiceForm extends EditComponent {
  onOkFormServiceEdit = () => {
    this.props.form.validateFields((error, values) => {
      if (!error && !this.props.isLoading) {
        const newValues = values;
        newValues.service = this.props.services.content.filter(service => this.getLink(service) === values.service)[0];
        this.props.onOkFormServiceEdit(newValues);
        this.props.form.resetFields();
      }
    });
  };
  onCancelFormServiceEdit = () => {
    this.props.form.resetFields();
    this.props.onCancelFormServiceEdit();
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
    return (
      <Modal
        visible={this.props.formServiceEditVisible}
        title={titleItem}
        okText={this.props.intl.messages.buttonSave}
        onOk={this.onOkFormServiceEdit}
        onCancel={this.onCancelFormServiceEdit}
        closable={false}
        maskClosable={false}
      >
        <Form vertical>
          {baseFields}
          <FormItem label={this.props.intl.messages.serviceFieldName}>
            {this.getSelectWithSearchField('service', this.getLink(object.service), serviceList)}
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

export default Form.create()(injectIntl(AccountEditServiceForm));
