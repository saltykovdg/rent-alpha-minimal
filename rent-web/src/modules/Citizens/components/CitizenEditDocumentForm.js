import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, Modal, Select, Row, Col } from 'antd';

import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class CitizenEditDocumentForm extends EditComponent {
  onOkFormDocumentEdit = () => {
    this.props.form.validateFields((error, values) => {
      if (!error && !this.props.isLoading) {
        const newValues = values;
        newValues.documentType = this.props.documentTypes.content.filter(documentType => this.getLink(documentType) === values.documentType)[0];
        this.props.onOkFormDocumentEdit(newValues);
        this.props.form.resetFields();
      }
    });
  };
  onCancelFormDocumentEdit = () => {
    this.props.form.resetFields();
    this.props.onCancelFormDocumentEdit();
  };
  render() {
    const object = this.props.document;
    const titleItem = this.props.id ? <FormattedMessage id="editPageEditTitle" /> : <FormattedMessage id="editPageCreateTitle" />;
    const baseFields = this.getBaseFields(object);
    let documentTypeList = null;
    if (this.props.documentTypes && this.props.documentTypes.content) {
      documentTypeList = this.props.documentTypes.content.map(documentType => (
        <Select.Option key={documentType.id} value={this.getLink(documentType)}>{documentType.name}</Select.Option>
      ));
      if (!this.props.id && !object.documentType.id) {
        object.documentType = this.props.documentTypes.content[0];
      }
    }
    return (
      <Modal
        visible={this.props.formDocumentEditVisible}
        title={titleItem}
        okText={this.props.intl.messages.buttonSave}
        onOk={this.onOkFormDocumentEdit}
        onCancel={this.onCancelFormDocumentEdit}
        closable={false}
        maskClosable={false}
      >
        <Form vertical>
          {baseFields}
          <FormItem label={this.props.intl.messages.documentTypeFieldName}>
            {this.getSelectWithSearchField('documentType', this.getLink(object.documentType), documentTypeList, this.onDocumentTypeChange)}
          </FormItem>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <FormItem label={this.props.intl.messages.documentFieldSeries}>
                {this.getInputField('documentSeries', object.documentSeries)}
              </FormItem>
            </Col>
            <Col className="gutter-row" span={12}>
              <FormItem label={this.props.intl.messages.documentFieldNumber}>
                {this.getInputField('documentNumber', object.documentNumber)}
              </FormItem>
            </Col>
          </Row>
          <FormItem label={this.props.intl.messages.documentFieldIssuingAuthority}>
            {this.getInputField('documentIssuingAuthority', object.documentIssuingAuthority)}
          </FormItem>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <FormItem label={this.props.intl.messages.documentFieldDateIssue}>
                {this.getDateField('documentDateIssue', object.documentDateIssue)}
              </FormItem>
            </Col>
            <Col className="gutter-row" span={8}>
              <FormItem label={this.props.intl.messages.commonFieldDateStart}>
                {this.getDateField('dateStart', object.dateStart)}
              </FormItem>
            </Col>
            <Col className="gutter-row" span={8}>
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

export default Form.create()(injectIntl(CitizenEditDocumentForm));
