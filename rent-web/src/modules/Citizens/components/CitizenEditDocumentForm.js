import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, Modal, Select, Row, Col, Button, Icon, Table, notification, Alert, Tabs } from 'antd';

import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const MAX_FILE_SIZE = parseInt(`${process.env.RENT_API_MAX_FILE_SIZE}`, 0);

class CitizenEditDocumentForm extends EditComponent {
  constructor(props, context) {
    super(props, context);
    this.state = { attachmentsFileNameError: false, activeTab: '1' };
  }
  onOk = () => {
    this.props.form.validateFields((error, values) => {
      if (!error && !this.props.isLoading) {
        const newValues = values;
        newValues.documentType = this.props.documentTypes.content.filter(documentType => this.getLink(documentType) === values.documentType)[0];

        let attachmentsError = false;
        const documentAttachments = this.props.document.documentAttachments;

        documentAttachments.forEach((attachment) => {
          if (!attachment.name) {
            attachmentsError = true;
          }
        });

        if (!attachmentsError) {
          newValues.documentAttachments = documentAttachments;
          this.props.onOkFormDocumentEdit(newValues);
        } else {
          this.setState({ attachmentsFileNameError: true, activeTab: '2' });
        }
      } else {
        this.setState({ activeTab: '1' });
      }
    });
  };
  onCancel = () => {
    this.props.onCancelFormDocumentEdit(this.props.document);
  };
  afterClose = () => {
    this.props.form.resetFields();
    this.setState({ attachmentsFileNameError: false, activeTab: '1' });
  }
  onViewDocumentAttachment = (attachment) => {
    let fileUrl = `${process.env.RENT_API_URL}${process.env.RENT_API_CONTENT_URL}/${attachment.urlLink}`;
    if (attachment.file) {
      fileUrl = URL.createObjectURL(attachment.file);
    }
    const otherWindow = window.open();
    otherWindow.opener = null;
    otherWindow.location = fileUrl;
  }
  onDeleteDocumentAttachment = (attachment) => {
    this.props.onDeleteDocumentAttachment(this.props.document, attachment);
  }
  onAddDocumentAttachment = () => {
    const attachmentFileRef = this.attachmentFile;
    attachmentFileRef.onchange = (event) => {
      const file = event.target;
      if (file.value) {
        if (file.files[0].size <= MAX_FILE_SIZE) {
          this.props.onAddDocumentAttachment(this.props.document, file.files[0]);
        } else {
          notification.warning({
            message: this.props.intl.messages.addAttachmentFileSizeErrorTitle,
            description: this.props.intl.messages.addAttachmentFileSizeErrorDescription,
          });
        }
        file.value = null;
      }
    };
    attachmentFileRef.click();
  }
  onTabClick = (tab) => {
    this.setState({ activeTab: tab });
  }
  render() {
    const object = this.props.document;
    const titleItem = object && object.id ? <FormattedMessage id="editPageEditDocumentOnCitizenTitle" /> : <FormattedMessage id="editPageAddDocumentOnCitizenTitle" />;
    const baseFields = this.getBaseFields(object);
    let documentTypeList = null;
    if (this.props.documentTypes && this.props.documentTypes.content) {
      documentTypeList = this.props.documentTypes.content.map(documentType => (
        <Select.Option key={documentType.id} value={this.getLink(documentType)}>{documentType.name}</Select.Option>
      ));
      if (!object.id && !object.documentType.id) {
        object.documentType = this.props.documentTypes.content[0];
      }
    }
    let attachmentsDataSource = [];
    if (object && object.documentAttachments && object.documentAttachments.length > 0) {
      attachmentsDataSource = object.documentAttachments;
      attachmentsDataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = newObj.id;
      });
    }
    const attachmentsColumns = [
      this.getAttachmentColumn(this.props.intl.messages.attachmentNameTitle, 'name'),
      this.getAttachmentActionColumn(this.onViewDocumentAttachment, this.onDeleteDocumentAttachment),
    ];
    return (
      <Modal
        visible={this.props.formDocumentEditVisible}
        title={titleItem}
        okText={object && object.id ? this.props.intl.messages.buttonApply : this.props.intl.messages.buttonAdd}
        onOk={this.onOk}
        onCancel={this.onCancel}
        afterClose={this.afterClose}
        closable={false}
        maskClosable={false}
      >
        <Tabs defaultActiveKey={this.state.activeTab} activeKey={this.state.activeTab} onTabClick={this.onTabClick}>
          <TabPane tab={this.props.intl.messages.documentTitle} key="1">
            <Form layout="horizontal">
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
          </TabPane>
          <TabPane tab={this.props.intl.messages.attachmentsTitle} key="2">
            {this.state.attachmentsFileNameError ? <Alert message={this.props.intl.messages.addAttachmentFileNameErrorTitle} type="error" /> : null}
            <Button size="small" type="dashed" onClick={() => this.onAddDocumentAttachment()}>
              <Icon type="link" /><FormattedMessage id="buttonAddNewAttachment" />
            </Button>
            <div className="attachments">
              <input type="file" className="hidden" accept="image/*" ref={(node) => { this.attachmentFile = node; }} />
              <Table
                dataSource={attachmentsDataSource}
                columns={attachmentsColumns}
                loading={this.props.isLoading}
                bordered
                pagination={false}
                size="small"
              />
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default Form.create()(injectIntl(CitizenEditDocumentForm));
