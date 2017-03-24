import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin, Select, Table } from 'antd';

import * as CitizenPath from './../paths/CitizenPath';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class CitizenEdit extends EditComponent {
  render() {
    const object = this.props.data;
    const titleItem = this.props.id ? <FormattedMessage id="editPageEditTitle" /> : <FormattedMessage id="editPageCreateTitle" />;
    const baseFields = this.getBaseFields(object);
    let genderTypes = null;
    if (this.props.genderTypes && this.props.genderTypes.content) {
      genderTypes = this.props.genderTypes.content.map(genderType => (
        <Select.Option key={genderType.id} value={this.getLink(genderType)}>{genderType.name}</Select.Option>
      ));
    }
    let documentsDataSource = [];
    if (object && object.documents && object.documents.length > 0) {
      documentsDataSource = object.documents.sort((a, b) => {
        return new Date(b.dateStart) - new Date(a.dateStart);
      });
      documentsDataSource.forEach((obj) => {
        const document = obj;
        document.key = document.id;
      });
    }
    const documentsColumns = [
      this.getColumn(this.props.intl.messages.documentTypeFieldName, 'documentType.name'),
      this.getColumn(this.props.intl.messages.documentFieldSeries, 'documentSeries'),
      this.getColumn(this.props.intl.messages.documentFieldNumber, 'documentNumber'),
      this.getColumn(this.props.intl.messages.documentFieldIssuingAuthority, 'documentIssuingAuthority'),
      this.getDateColumn(this.props.intl.messages.documentFieldDateIssue, 'documentDateIssue'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateStart, 'dateStart'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateEnd, 'dateEnd'),
      this.getActionColumn(this.props.showFormDocumentEdit, this.props.onDeleteDocument),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><Link to={CitizenPath.CITIZEN_LIST}><FormattedMessage id="citizensTitle" /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>{titleItem}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{titleItem}</h1>
        <Spin spinning={this.props.isLoading}>
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            {baseFields}
            <FormItem label={this.props.intl.messages.citizenFieldGenderType}>
              {this.getSelectField('genderType', object.genderType, genderTypes)}
            </FormItem>
            <FormItem label={this.props.intl.messages.citizenFieldFirstName}>
              {this.getInputField('firstName', object.firstName)}
            </FormItem>
            <FormItem label={this.props.intl.messages.citizenFieldLastName}>
              {this.getInputField('lastName', object.lastName)}
            </FormItem>
            <FormItem label={this.props.intl.messages.citizenFieldFatherName}>
              {this.getInputField('fatherName', object.fatherName)}
            </FormItem>
            <FormItem label={this.props.intl.messages.citizenFieldBirthday}>
              {this.getDateField('birthday', object.birthday)}
            </FormItem>
            <h2>{this.props.intl.messages.documentsTitle}</h2>
            <Button size="small" onClick={() => this.props.showFormDocumentEdit()}>
              <FormattedMessage id="buttonAddNewDocument" />
            </Button>
            <Table
              dataSource={documentsDataSource}
              columns={documentsColumns}
              bordered pagination={false}
              size="small"
            />
            <FormItem>
              <Button type="primary" htmlType="submit"><FormattedMessage id="buttonSave" /></Button>
              <Button className="pull-right" onClick={() => this.forwardTo(CitizenPath.CITIZEN_LIST)}>
                <FormattedMessage id="buttonCancel" />
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(injectIntl(CitizenEdit));
