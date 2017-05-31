import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, Modal, Select, Row, Col, Button, Icon, Table, notification, Alert, Tabs } from 'antd';

import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const MAX_FILE_SIZE = parseInt(`${process.env.RENT_API_MAX_FILE_SIZE}`, 0);
const MAX_CITIZENS_PER_PAGE_SIZE = 5;

class AccountEditRegisteredForm extends EditComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      attachmentsFileNameError: false,
      selectRegisteredError: false,
      activeTab: '1',
    };
  }
  onOk = () => {
    const citizen = this.props.registered.citizen;
    if (citizen) {
      this.props.form.validateFields((error, values) => {
        if (!error && !this.props.isLoading) {
          const newValues = values;
          newValues.registrationType = this.props.registrationTypes.content.filter(registrationType => this.getLink(registrationType) === values.registrationType)[0];

          let attachmentsError = false;
          const documentAttachments = this.props.registered.documentAttachments;

          documentAttachments.forEach((attachment) => {
            if (!attachment.name) {
              attachmentsError = true;
            }
          });

          if (!attachmentsError) {
            newValues.documentAttachments = documentAttachments;
            newValues.citizen = citizen;
            this.props.onOkFormRegisteredEdit(newValues);
          } else {
            this.setState({ attachmentsFileNameError: true, activeTab: '2' });
          }
        } else {
          this.setState({ activeTab: '1' });
        }
      });
    } else {
      this.setState({ selectRegisteredError: true, activeTab: '1' });
    }
  }
  onCancel = () => {
    this.props.onCancelFormRegisteredEdit(this.props.registered);
  }
  afterClose = () => {
    this.props.clearLocalDataCitizens();
    this.props.form.resetFields();
    this.setState({
      attachmentsFileNameError: false,
      selectRegisteredError: false,
      activeTab: '1',
    });
  }
  onViewDocumentAttachment = (attachment) => {
    let fileUrl = `${process.env.RENT_API_CONTENT_URL}/${attachment.urlLink}`;
    if (attachment.file) {
      if (window.navigator.msSaveOrOpenBlob) {
        const blob = new Blob([attachment.file]);
        window.navigator.msSaveOrOpenBlob(blob, attachment.file.name);
      } else {
        fileUrl = URL.createObjectURL(attachment.file);
        const tempLink = document.createElement('a');
        tempLink.href = fileUrl;
        tempLink.setAttribute('download', attachment.name);
        tempLink.setAttribute('target', '_blank');
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
      }
    } else {
      this.props.onDownloadContent(fileUrl);
    }
  }
  onDeleteRegisteredDocumentAttachment = (attachment) => {
    this.props.onDeleteRegisteredDocumentAttachment(this.props.registered, attachment);
  }
  onAddRegisteredDocumentAttachment = () => {
    const attachmentFileRef = this.attachmentFile;
    attachmentFileRef.onchange = (event) => {
      const file = event.target;
      if (file.value) {
        if (file.files[0].size <= MAX_FILE_SIZE) {
          this.props.onAddRegisteredDocumentAttachment(this.props.registered, file.files[0]);
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
  onSearchRegistered = (page = 0) => {
    const firstNameSearchField = this.props.form.getFieldValue('firstNameSearchField');
    const lastNameSearchField = this.props.form.getFieldValue('lastNameSearchField');
    const fatherNameSearchField = this.props.form.getFieldValue('fatherNameSearchField');
    const documentSeriesSearchField = this.props.form.getFieldValue('documentSeriesSearchField');
    const documentNumberSearchField = this.props.form.getFieldValue('documentNumberSearchField');
    this.props.onSearchRegistered(
      firstNameSearchField,
      lastNameSearchField,
      fatherNameSearchField,
      documentSeriesSearchField,
      documentNumberSearchField,
      page,
      MAX_CITIZENS_PER_PAGE_SIZE,
    );
  }
  onSelectCitizen = (citizen) => {
    this.props.registered.citizen = citizen;
    this.setState({ selectRegisteredError: false });
    this.forceUpdate();
  }
  onChangeCitizenClick = () => {
    this.props.registered.citizen = null;
    this.forceUpdate();
  }
  getActionCitizenColumn = (onSelect) => {
    return {
      title: this.props.intl.messages.tableColumnActions,
      key: 'action',
      render(text, record) {
        return (
          <span>
            <Link onClick={() => onSelect(record)}><FormattedMessage id="buttonSelect" /></Link>
          </span>
        );
      },
    };
  }
  getTableCitizenComponent() {
    const columns = [
      this.getColumn(this.props.intl.messages.commonFieldCitizen, 'citizen'),
      this.getColumn(this.props.intl.messages.citizenFieldBirthday, 'birthday'),
      this.getActionCitizenColumn(this.onSelectCitizen),
    ];
    let dataSource = [];
    const onSearchRegistered = this.onSearchRegistered;
    let pagination = false;
    const citizens = this.props.citizens;
    if (citizens && citizens.content) {
      dataSource = citizens.content;
      dataSource.forEach((obj) => {
        const newObj = obj;
        newObj.citizen = `${obj.lastName} ${obj.firstName} ${obj.fatherName}`;
        newObj.key = newObj.id;
      });
      if (citizens.page) {
        if (citizens.page.totalPages > 1) {
          pagination = {
            total: citizens.page.totalElements,
            current: citizens.page.number + 1,
            pageSize: citizens.page.size,
            onChange(current) {
              pagination.current = current;
              onSearchRegistered(current - 1);
            },
          };
        }
      }
    }
    return (
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        loading={this.props.isLoading}
        size="small"
        bordered
      />
    );
  }
  render() {
    const object = this.props.registered;
    const titleItem = object && object.id ? <FormattedMessage id="editPageEditRegisteredOnAccountTitle" /> : <FormattedMessage id="editPageAddRegisteredOnAccountTitle" />;
    const baseFields = this.getBaseFields(object);
    let registrationTypeList = null;
    if (this.props.registrationTypes && this.props.registrationTypes.content) {
      registrationTypeList = this.props.registrationTypes.content.map(registrationType => (
        <Select.Option key={registrationType.id} value={this.getLink(registrationType)}>{registrationType.name}</Select.Option>
      ));
      if (!object.id && !object.registrationType.id) {
        object.registrationType = this.props.registrationTypes.content[0];
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
      this.getAttachmentActionColumn(this.onViewDocumentAttachment, this.onDeleteRegisteredDocumentAttachment),
    ];
    const panelSearchVisible = !object.citizen;
    return (
      <Modal
        visible={this.props.formRegisteredEditVisible}
        title={titleItem}
        okText={object && object.id ? this.props.intl.messages.buttonApply : this.props.intl.messages.buttonAdd}
        onOk={this.onOk}
        onCancel={this.onCancel}
        afterClose={this.afterClose}
        closable={false}
        maskClosable={false}
      >
        <Tabs defaultActiveKey={this.state.activeTab} activeKey={this.state.activeTab} onTabClick={this.onTabClick}>
          <TabPane tab={this.props.intl.messages.registeredOneTitle} key="1">
            {panelSearchVisible ?
              <Form layout="horizontal">
                {this.state.selectRegisteredError ? <Alert message={this.props.intl.messages.selectRegisteredErrorTitle} type="error" /> : null}
                <Row gutter={10}>
                  <Col className="gutter-row" span={8}>
                    <FormItem label={this.props.intl.messages.citizenFieldFirstName}>
                      {this.getInputField('firstNameSearchField', '', false)}
                    </FormItem>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <FormItem label={this.props.intl.messages.citizenFieldLastName}>
                      {this.getInputField('lastNameSearchField', '', false)}
                    </FormItem>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <FormItem label={this.props.intl.messages.citizenFieldFatherName}>
                      {this.getInputField('fatherNameSearchField', '', false)}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col className="gutter-row" span={8}>
                    <FormItem label={this.props.intl.messages.documentFieldSeries}>
                      {this.getInputField('documentSeriesSearchField', '', false)}
                    </FormItem>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <FormItem label={this.props.intl.messages.documentFieldNumber}>
                      {this.getInputField('documentNumberSearchField', '', false)}
                    </FormItem>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <FormItem label=" " colon={false}>
                      <Button type="primary" htmlType="submit" className="full-width" onClick={() => this.onSearchRegistered()}>
                        <FormattedMessage id="buttonFind" />
                      </Button>
                    </FormItem>
                  </Col>
                </Row>
                {this.getTableCitizenComponent()}
              </Form> :
              <Form layout="horizontal">
                {baseFields}
                <FormItem label={this.props.intl.messages.commonFieldCitizen}>
                  {this.getInputField('citizen', `${object.citizen.lastName} ${object.citizen.firstName} ${object.citizen.fatherName}`, false, true)}
                </FormItem>
                <Row gutter={16}>
                  <Col className="gutter-row" span={12}>
                    <FormItem label={this.props.intl.messages.citizenFieldBirthday}>
                      {this.getDateField('birthdayCitizen', object.citizen.birthday, false, true)}
                    </FormItem>
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <FormItem label=" " colon={false}>
                      <Button type="default" htmlType="submit" className="full-width" onClick={() => this.onChangeCitizenClick()}>
                        <FormattedMessage id="buttonChange" />
                      </Button>
                    </FormItem>
                  </Col>
                </Row>
                <FormItem label={this.props.intl.messages.registrationTypeFieldName}>
                  {this.getSelectWithSearchField('registrationType', this.getLink(object.registrationType), registrationTypeList)}
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
            }
          </TabPane>
          <TabPane tab={this.props.intl.messages.attachmentsTitle} key="2">
            {this.state.attachmentsFileNameError ? <Alert message={this.props.intl.messages.addAttachmentFileNameErrorTitle} type="error" /> : null}
            <Button size="small" type="dashed" onClick={() => this.onAddRegisteredDocumentAttachment()}>
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

export default Form.create()(injectIntl(AccountEditRegisteredForm));
