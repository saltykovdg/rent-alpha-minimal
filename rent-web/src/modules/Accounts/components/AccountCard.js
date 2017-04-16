import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin, Row, Col, Table, Select, Tabs } from 'antd';

import * as AccountPath from './../paths/AccountPath';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class AccountCard extends EditComponent {
  changeWorkingPeriod = (value) => {
    const selectedWorkingPeriod = this.props.workingPeriods.content.filter(workingPeriod => this.getLink(workingPeriod) === value)[0];
    this.props.changeWorkingPeriod(selectedWorkingPeriod);
  }
  render() {
    const object = this.props.data;
    const titleItem = <FormattedMessage id="accountCardTitle" />;
    const baseFields = this.getBaseFields(object);
    let workingPeriodsList = null;
    if (this.props.workingPeriods && this.props.workingPeriods.content) {
      workingPeriodsList = this.props.workingPeriods.content.map(workingPeriod => (
        <Select.Option key={workingPeriod.id} value={this.getLink(workingPeriod)}>{workingPeriod.name}</Select.Option>
      ));
    }
    let calculationsDataSource = [];
    if (object && object.calculations && object.calculations.length > 0 && this.props.selectedWorkingPeriod) {
      calculationsDataSource = object.calculations;
      calculationsDataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = newObj.id;
      });
    }
    const calculationsColumns = [
      this.getColumn(this.props.intl.messages.serviceFieldName, ''),
      this.getColumn(this.props.intl.messages.tariffTitle, ''),
      this.getColumn(this.props.intl.messages.consumptionTitle, ''),
      this.getColumn(this.props.intl.messages.measurementUnitShortTitle, ''),
      this.getColumn(this.props.intl.messages.openingBalanceTitle, ''),
      this.getColumn(this.props.intl.messages.accrualTitle, ''),
      this.getColumn(this.props.intl.messages.recalculationTitle, ''),
      this.getColumn(this.props.intl.messages.paymentTitle, ''),
      this.getColumn(this.props.intl.messages.closingBalanceTitle, ''),
    ];
    let owners = '';
    let ownersDataSource = [];
    if (object && object.owners && object.owners.length > 0 && this.props.selectedWorkingPeriod) {
      ownersDataSource = this.getListForPeriod(object.owners, this.props.selectedWorkingPeriod).sort((a, b) => {
        return new Date(b.dateStart) - new Date(a.dateStart);
      });
      ownersDataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = newObj.id;
        owners += `${owners ? '; ' : ''}${obj.citizen.lastName} ${obj.citizen.firstName} ${obj.citizen.fatherName}`;
      });
    }
    const ownersColumns = [
      this.getColumn(this.props.intl.messages.citizenFieldFirstName, 'citizen.firstName'),
      this.getColumn(this.props.intl.messages.citizenFieldLastName, 'citizen.lastName'),
      this.getColumn(this.props.intl.messages.citizenFieldFatherName, 'citizen.fatherName'),
      this.getColumn(this.props.intl.messages.citizenFieldBirthday, 'citizen.birthday'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateStart, 'dateStart'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateEnd, 'dateEnd'),
    ];
    let registeredCount = 0;
    let registeredDataSource = [];
    if (object && object.registered && object.registered.length > 0 && this.props.selectedWorkingPeriod) {
      registeredDataSource = this.getListForPeriod(object.registered, this.props.selectedWorkingPeriod).sort((a, b) => {
        return new Date(b.dateStart) - new Date(a.dateStart);
      });
      registeredDataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = newObj.id;
      });
      registeredCount = registeredDataSource.length;
    }
    const registeredColumns = [
      this.getColumn(this.props.intl.messages.citizenFieldFirstName, 'citizen.firstName'),
      this.getColumn(this.props.intl.messages.citizenFieldLastName, 'citizen.lastName'),
      this.getColumn(this.props.intl.messages.citizenFieldFatherName, 'citizen.fatherName'),
      this.getColumn(this.props.intl.messages.citizenFieldBirthday, 'citizen.birthday'),
      this.getColumn(this.props.intl.messages.registrationTypeFieldName, 'registrationType.name'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateStart, 'dateStart'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateEnd, 'dateEnd'),
    ];
    let metersDataSource = [];
    if (object && object.meters && object.meters.length > 0 && this.props.selectedWorkingPeriod) {
      metersDataSource = this.getListForPeriod(object.meters, this.props.selectedWorkingPeriod).sort((a, b) => {
        return new Date(b.dateStart) - new Date(a.dateStart);
      });
      metersDataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = newObj.id;
      });
    }
    const metersColumns = [
      this.getColumn(this.props.intl.messages.serviceFieldName, 'meter.service.name'),
      this.getColumn(this.props.intl.messages.meterFieldName, 'meter.name'),
      this.getColumn(this.props.intl.messages.meterFieldSerialNumber, 'meter.serialNumber'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateStart, 'dateStart'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateEnd, 'dateEnd'),
    ];
    let address = '';
    if (object && object.id) {
      address += `${object.apartment.building.street.streetType.nameShort} `;
      address += `${object.apartment.building.street.name}, `;
      address += `${this.props.intl.messages.buildingFieldHouse.toLowerCase()} `;
      address += `${object.apartment.building.house}, `;
      address += `${this.props.intl.messages.apartmentFieldApartment.toLowerCase()} `;
      address += `${object.apartment.apartment}`;
    }
    let accountTotalArea = '';
    let accountPhoneNumbers = '';
    if (this.props.selectedWorkingPeriod) {
      accountTotalArea = this.getAccountTotalAreaForPeriod(object, this.props.selectedWorkingPeriod);
      accountPhoneNumbers = this.getAccountPhoneNumbersForPeriod(object, this.props.selectedWorkingPeriod);
    }
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><Link to={AccountPath.ACCOUNT_LIST}><FormattedMessage id="accountsTitle" /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>{titleItem}</Breadcrumb.Item>
        </Breadcrumb>
        <Spin spinning={this.props.isLoading}>
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            {baseFields}
            <Row gutter={16}>
              <Col className="gutter-row" span={20}>
                <h1>{titleItem}</h1>
              </Col>
              <Col className="gutter-row" span={4}>
                <FormItem label={this.props.intl.messages.workingPeriodsTitle}>
                  {this.getSelectField('name', this.props.selectedWorkingPeriod, workingPeriodsList, this.changeWorkingPeriod, false)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={4}>
                <FormItem label={this.props.intl.messages.accountFieldAccountNumber}>
                  {this.getInputField('accountNumber', object.accountNumber, false, true)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={8}>
                <FormItem label={this.props.intl.messages.addressShortTitle}>
                  {this.getInputField('address', address, false, true)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={4}>
                <FormItem label={this.props.intl.messages.apartmentFieldRoomsNumber}>
                  {this.getInputField('roomsNumber', object.apartment.roomsNumber, false, true)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={4}>
                <FormItem label={this.props.intl.messages.apartmentFieldTotalArea}>
                  {this.getInputField('accountTotalArea', accountTotalArea, false, true)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={4}>
                <FormItem label={this.props.intl.messages.registeredCountTitle}>
                  {this.getInputField('registeredCount', registeredCount, false, true)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <FormItem label={this.props.intl.messages.ownersTitle}>
                  {this.getInputField('owners', owners, false, true)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={12}>
                <FormItem label={this.props.intl.messages.phoneNumbersTitle}>
                  {this.getInputField('accountPhoneNumbers', accountPhoneNumbers, false, true)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={16}>
                <FormItem label={this.props.intl.messages.managementCompanyTitle}>
                  {this.getInputField('contractor', object.contractor.fullName, false, true)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={4}>
                <FormItem label={this.props.intl.messages.accountFieldDateOpen}>
                  {this.getInputField('dateOpen', object.dateOpen, false, true)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={4}>
                <FormItem label={this.props.intl.messages.accountFieldDateClose}>
                  {this.getInputField('dateClose', object.dateClose, false, true)}
                </FormItem>
              </Col>
            </Row>
            <Tabs>
              <TabPane tab={this.props.intl.messages.calculationsTitle} key="1">
                <Table
                  dataSource={calculationsDataSource}
                  columns={calculationsColumns}
                  bordered pagination={false}
                  size="small"
                />
              </TabPane>
              <TabPane tab={this.props.intl.messages.ownersTitle} key="2">
                <Table
                  dataSource={ownersDataSource}
                  columns={ownersColumns}
                  bordered pagination={false}
                  size="small"
                />
              </TabPane>
              <TabPane tab={this.props.intl.messages.registeredTitle} key="3">
                <Table
                  dataSource={registeredDataSource}
                  columns={registeredColumns}
                  bordered pagination={false}
                  size="small"
                />
              </TabPane>
              <TabPane tab={this.props.intl.messages.metersTitle} key="4">
                <Table
                  dataSource={metersDataSource}
                  columns={metersColumns}
                  bordered pagination={false}
                  size="small"
                />
              </TabPane>
            </Tabs>
            <FormItem>
              <Button type="primary" onClick={() => this.forwardTo(`${AccountPath.ACCOUNT_EDIT}/${object.id}`)}>
                <FormattedMessage id="buttonEdit" />
              </Button>
              <Button className="pull-right" onClick={() => this.forwardTo(AccountPath.ACCOUNT_LIST)}>
                <FormattedMessage id="buttonGoToAccountList" />
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(injectIntl(AccountCard));
