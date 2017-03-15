import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin, Select, Row, Col, Table } from 'antd';

import * as AccountPath from './../paths/AccountPath';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class AccountEdit extends EditComponent {
  onStreetChange = (value) => {
    this.props.form.setFieldsValue({ building: '' });
    this.props.form.setFieldsValue({ apartment: '' });
    this.props.onStreetChange(value);
  }
  onBuildingChange = (value) => {
    this.props.form.setFieldsValue({ apartment: '' });
    this.props.onBuildingChange(value);
  }
  render() {
    const object = this.props.data;
    const titleItem = this.props.id ? <FormattedMessage id="editPageEditTitle" /> : <FormattedMessage id="editPageCreateTitle" />;
    const baseFields = this.getBaseFields(object);
    let contractorsList = null;
    if (this.props.contractors && this.props.contractors.content) {
      contractorsList = this.props.contractors.content.map(contractor => (
        <Select.Option key={contractor.id} value={this.getLink(contractor)}>{contractor.name}</Select.Option>
      ));
      if (!this.props.id) {
        object.contractor = this.props.contractors.content[0];
      }
    }
    let streetList = null;
    if (this.props.streets && this.props.streets.content) {
      streetList = this.props.streets.content.map(street => (
        <Select.Option key={street.id} value={street.id}>{street.name}</Select.Option>
      ));
    }
    let buildingList = null;
    if (this.props.buildings && this.props.buildings.content) {
      buildingList = this.props.buildings.content.map(building => (
        <Select.Option key={building.id} value={building.id}>{building.house}</Select.Option>
      ));
    }
    let apartmentList = null;
    if (this.props.apartments && this.props.apartments.content) {
      apartmentList = this.props.apartments.content.map(apartment => (
        <Select.Option key={apartment.id} value={this.getLink(apartment)}>{apartment.apartment}</Select.Option>
      ));
    }
    let parametersDataSource = [];
    if (object && object.parameters && object.parameters.length > 0) {
      parametersDataSource = object.parameters.sort((a, b) => {
        const sort1 = a.parameterType.code - b.parameterType.code;
        const sort2 = new Date(b.dateStart) - new Date(a.dateStart);
        return sort1 || sort2;
      });
      parametersDataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = newObj.id;
      });
    }
    const parametersColumns = [
      this.getColumn(this.props.intl.messages.parameterTypeFieldName, 'parameterType.name'),
      this.getColumn(this.props.intl.messages.commonFieldValue, 'value'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateStart, 'dateStart'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateEnd, 'dateEnd'),
      this.getActionColumn(this.props.showFormParameterEdit, this.props.onDeleteParameter),
    ];
    let servicesDataSource = [];
    if (object && object.services && object.services.length > 0) {
      servicesDataSource = object.services.sort((a, b) => {
        const sort1 = a.service.name.localeCompare(b.service.name);
        const sort2 = new Date(b.dateStart) - new Date(a.dateStart);
        return sort1 || sort2;
      });
      servicesDataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = newObj.id;
      });
    }
    const servicesColumns = [
      this.getColumn(this.props.intl.messages.serviceFieldName, 'service.name'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateStart, 'dateStart'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateEnd, 'dateEnd'),
      this.getColumn(this.props.intl.messages.tariffFieldName, 'tariff.name'),
      this.getActionColumn(this.props.showFormServiceEdit, this.props.onDeleteService),
    ];
    let ownersDataSource = [];
    if (object && object.owners && object.owners.length > 0) {
      ownersDataSource = object.owners.sort((a, b) => {
        return new Date(b.dateStart) - new Date(a.dateStart);
      });
      ownersDataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = newObj.id;
      });
    }
    const ownersColumns = [
      this.getColumn(this.props.intl.messages.citizenFieldFirstName, 'citizen.firstName'),
      this.getColumn(this.props.intl.messages.citizenFieldLastName, 'citizen.lastName'),
      this.getColumn(this.props.intl.messages.citizenFieldFatherName, 'citizen.fatherName'),
      this.getDateColumn(this.props.intl.messages.citizenFieldBirthday, 'citizen.birthday'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateStart, 'dateStart'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateEnd, 'dateEnd'),
      this.getActionColumn(this.props.showFormOwnerEdit, this.props.onDeleteOwner),
    ];
    let registeredDataSource = [];
    if (object && object.registered && object.registered.length > 0) {
      registeredDataSource = object.registered.sort((a, b) => {
        return new Date(b.dateStart) - new Date(a.dateStart);
      });
      registeredDataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = newObj.id;
      });
    }
    const registeredColumns = [
      this.getColumn(this.props.intl.messages.citizenFieldFirstName, 'citizen.firstName'),
      this.getColumn(this.props.intl.messages.citizenFieldLastName, 'citizen.lastName'),
      this.getColumn(this.props.intl.messages.citizenFieldFatherName, 'citizen.fatherName'),
      this.getDateColumn(this.props.intl.messages.citizenFieldBirthday, 'citizen.birthday'),
      this.getColumn(this.props.intl.messages.registrationTypeFieldName, 'registrationType.name'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateStart, 'dateStart'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateEnd, 'dateEnd'),
      this.getActionColumn(this.props.showFormRegisteredEdit, this.props.onDeleteRegistered),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><Link to={AccountPath.ACCOUNT_LIST}><FormattedMessage id="accountsTitle" /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>{titleItem}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{titleItem}</h1>
        <Spin spinning={this.props.isLoading}>
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            {baseFields}
            <Row gutter={16}>
              <Col className="gutter-row" span={8}>
                <FormItem label={this.props.intl.messages.accountFieldAccountNumber}>
                  {this.getInputField('accountNumber', object.accountNumber)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={8}>
                <FormItem label={this.props.intl.messages.accountFieldDateOpen}>
                  {this.getDateField('dateOpen', object.dateOpen)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={8}>
                <FormItem label={this.props.intl.messages.accountFieldDateClose}>
                  {this.getDateField('dateClose', object.dateClose, false)}
                </FormItem>
              </Col>
            </Row>
            <h2>{this.props.intl.messages.managementCompanyTitle}</h2>
            <FormItem label={this.props.intl.messages.contractorFieldName}>
              {this.getSelectWithSearchField('contractor', this.getLink(object.contractor), contractorsList)}
            </FormItem>
            <h2>{this.props.intl.messages.addressShortTitle}</h2>
            <Row gutter={16}>
              <Col className="gutter-row" span={8}>
                <FormItem label={this.props.intl.messages.streetFieldName}>
                  {this.getSelectWithSearchField('street', object.apartment.building.street.id, streetList, this.onStreetChange)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={8}>
                <FormItem label={this.props.intl.messages.buildingFieldHouse}>
                  {this.getSelectWithSearchField('building', object.apartment.building.id, buildingList, this.onBuildingChange)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={8}>
                <FormItem label={this.props.intl.messages.apartmentFieldApartment}>
                  {this.getSelectWithSearchField('apartment', this.getLink(object.apartment), apartmentList)}
                </FormItem>
              </Col>
            </Row>
            <h2>{this.props.intl.messages.parameterTitle}</h2>
            <Button size="small" style={{ marginBottom: '5px' }} onClick={() => this.props.showFormParameterEdit()}>
              <FormattedMessage id="buttonAddNewParameter" />
            </Button>
            <Table
              dataSource={parametersDataSource}
              columns={parametersColumns}
              bordered pagination={false}
              size="small"
            />
            <br />
            <h2>{this.props.intl.messages.servicesTitle}</h2>
            <Button size="small" style={{ marginBottom: '5px' }} onClick={() => this.props.showFormServiceEdit()}>
              <FormattedMessage id="buttonAddNewService" />
            </Button>
            <Table
              dataSource={servicesDataSource}
              columns={servicesColumns}
              bordered pagination={false}
              size="small"
            />
            <br />
            <h2>{this.props.intl.messages.ownersTitle}</h2>
            <Button size="small" style={{ marginBottom: '5px' }} onClick={() => this.props.showFormOwnerEdit()}>
              <FormattedMessage id="buttonAddNewOwner" />
            </Button>
            <Table
              dataSource={ownersDataSource}
              columns={ownersColumns}
              bordered pagination={false}
              size="small"
            />
            <br />
            <h2>{this.props.intl.messages.registeredTitle}</h2>
            <Button size="small" style={{ marginBottom: '5px' }} onClick={() => this.props.showFormRegisteredEdit()}>
              <FormattedMessage id="buttonAddNewRegistered" />
            </Button>
            <Table
              dataSource={registeredDataSource}
              columns={registeredColumns}
              bordered pagination={false}
              size="small"
            />
            <br />
            <FormItem>
              <Button type="primary" htmlType="submit"><FormattedMessage id="buttonSave" /></Button>
              <Button className="pull-right" onClick={() => this.forwardTo(AccountPath.ACCOUNT_LIST)}>
                <FormattedMessage id="buttonCancel" />
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(injectIntl(AccountEdit));
