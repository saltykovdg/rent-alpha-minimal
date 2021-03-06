import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin, Row, Col, Table, Select, Tabs, Popconfirm } from 'antd';

import * as AccountPath from './../paths/AccountPath';
import * as CitizenPath from './../../Citizens/paths/CitizenPath';
import * as MeterPath from './../../Meters/paths/MeterPath';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class AccountCard extends EditComponent {
  changeWorkingPeriod = (value) => {
    const selectedWorkingPeriod = this.props.workingPeriods.content.filter(workingPeriod => this.getLink(workingPeriod) === value)[0];
    this.props.changeWorkingPeriod(selectedWorkingPeriod);
  }
  render() {
    const messages = this.props.intl.messages;
    const object = this.props.data;
    const calculations = this.props.calculations;
    const titleItem = <FormattedMessage id="accountCardTitle" />;
    let workingPeriodsList = null;
    if (this.props.workingPeriods && this.props.workingPeriods.content) {
      workingPeriodsList = this.props.workingPeriods.content.map(workingPeriod => (
        <Select.Option key={workingPeriod.id} value={this.getLink(workingPeriod)}>{workingPeriod.name}</Select.Option>
      ));
    }
    let calculationsDataSource = [];
    if (calculations) {
      calculationsDataSource = Object.keys(calculations).map(key => calculations[key]);
      let openingBalance = 0;
      let accrual = 0;
      let recalculation = 0;
      let payment = 0;
      let closingBalance = 0;
      calculationsDataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = Math.random();
        openingBalance += newObj.openingBalance;
        accrual += newObj.accrual;
        recalculation += newObj.recalculation;
        payment += newObj.payment;
        closingBalance += newObj.closingBalance;
      });
      if (calculationsDataSource.length > 0) {
        calculationsDataSource = calculationsDataSource.sort((a, b) => {
          return a.service.name.localeCompare(b.service.name);
        });
        calculationsDataSource.push({
          key: Math.random(),
          service: {
            name: messages.commonFieldTotal,
          },
          openingBalance: openingBalance.toFixed(2),
          accrual: accrual.toFixed(2),
          recalculation: recalculation.toFixed(2),
          payment: payment.toFixed(2),
          closingBalance: closingBalance.toFixed(2),
        });
      }
    }
    const calculationsColumns = [
      this.getColumn(messages.serviceFieldName, 'service.name'),
      this.getColumn(messages.tariffTitle, 'tariffValue'),
      this.getColumn(messages.consumptionTitle, 'consumption'),
      this.getColumn(messages.measurementUnitShortTitle, 'tariffMeasurementUnit.name'),
      this.getColumn(messages.openingBalanceTitle, 'openingBalance'),
      this.getColumn(messages.accrualTitle, 'accrual'),
      this.getColumn(messages.recalculationTitle, 'recalculation'),
      this.getColumn(messages.paymentTitle, 'payment'),
      this.getColumn(messages.closingBalanceTitle, 'closingBalance'),
    ];
    const documentCitizenColumns = [
      this.getColumn(messages.documentTypeFieldName, 'documentType.name'),
      this.getColumn(messages.documentFieldSeries, 'documentSeries'),
      this.getColumn(messages.documentFieldNumber, 'documentNumber'),
      this.getColumn(messages.documentFieldIssuingAuthority, 'documentIssuingAuthority'),
      this.getDateColumn(messages.documentFieldDateIssue, 'documentDateIssue'),
      this.getDateColumn(messages.commonFieldDateStart, 'dateStart'),
      this.getDateColumn(messages.commonFieldDateEnd, 'dateEnd'),
    ];
    const getCitizenDocumentsForPeriod = (documents, workingPeriod) => {
      const documentCitizenDataSource = this.getListForPeriod(documents, workingPeriod).sort((a, b) => {
        return new Date(b.dateStart) - new Date(a.dateStart);
      });
      documentCitizenDataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = Math.random();
      });
      return documentCitizenDataSource;
    };
    const expandedOwnerRowRender = (record) => {
      const documentOwnershipDataSource = [record];
      const documentCitizenDataSource = getCitizenDocumentsForPeriod(record.citizen.documents, this.props.selectedWorkingPeriod);
      return (
        <div>
          <Table
            title={() => <h4>{messages.documentOwnershipTitle}</h4>}
            dataSource={documentOwnershipDataSource}
            columns={documentCitizenColumns}
            pagination={false}
          />
          <Table
            title={() => <h4>{messages.documentCitizenTitle}</h4>}
            dataSource={documentCitizenDataSource}
            columns={documentCitizenColumns}
            pagination={false}
          />
        </div>
      );
    };
    const expandedRegisteredRowRender = (record) => {
      const documentCitizenDataSource = getCitizenDocumentsForPeriod(record.citizen.documents, this.props.selectedWorkingPeriod);
      return (
        <div>
          <Table
            title={() => <h4>{messages.documentCitizenTitle}</h4>}
            dataSource={documentCitizenDataSource}
            columns={documentCitizenColumns}
            pagination={false}
          />
        </div>
      );
    };
    const expandedMeterRowRender = (record) => {
      const meterValuesColumns = [
        this.getColumn(this.props.intl.messages.meterFieldValue, 'value'),
        this.getColumn(this.props.intl.messages.meterFieldConsumption, 'consumption'),
        this.getDateColumn(this.props.intl.messages.meterFieldDateValue, 'dateValue'),
      ];
      let meterValuesDataSource = [];
      if (record && record.meter && record.meter.values && record.meter.values.length > 0) {
        meterValuesDataSource = record.meter.values.sort((a, b) => {
          return new Date(b.dateValue) - new Date(a.dateValue);
        });
        meterValuesDataSource.forEach((obj) => {
          const newObj = obj;
          newObj.key = Math.random();
        });
      }
      let meterValuesPagination = false;
      if (meterValuesDataSource && meterValuesDataSource.length > 5) {
        meterValuesPagination = {
          total: meterValuesDataSource.length,
          pageSize: 5,
          size: 'small',
        };
      }
      return (
        <div>
          <Table
            title={() => <h4>{messages.meterValuesTitle}</h4>}
            dataSource={meterValuesDataSource}
            columns={meterValuesColumns}
            pagination={meterValuesPagination}
          />
        </div>
      );
    };
    const expandedPaymentRowRender = (record) => {
      const serviceCalculationInfoColumns = [
        this.getColumn(messages.serviceFieldName, 'service.name'),
        this.getColumn(messages.commonFieldSum, 'sum'),
      ];
      let serviceCalculationInfoDataSource = [];
      if (record && record.serviceCalculationInfoList) {
        serviceCalculationInfoDataSource = record.serviceCalculationInfoList.sort((a, b) => {
          return a.service.name.localeCompare(b.service.name);
        });
        serviceCalculationInfoDataSource.forEach((obj) => {
          const newObj = obj;
          newObj.key = Math.random();
        });
      }
      return (
        <div>
          <Table
            title={() => <h4>{messages.paymentsServicesTitle}</h4>}
            dataSource={serviceCalculationInfoDataSource}
            columns={serviceCalculationInfoColumns}
            pagination={false}
          />
        </div>
      );
    };
    const expandedRecalculationRowRender = (record) => {
      const serviceCalculationInfoColumns = [
        this.getColumn(messages.serviceFieldName, 'service.name'),
        this.getColumn(messages.commonFieldSum, 'sum'),
      ];
      let serviceCalculationInfoDataSource = [];
      if (record && record.serviceCalculationInfoList) {
        serviceCalculationInfoDataSource = record.serviceCalculationInfoList.sort((a, b) => {
          return a.service.name.localeCompare(b.service.name);
        });
        serviceCalculationInfoDataSource.forEach((obj) => {
          const newObj = obj;
          newObj.key = Math.random();
        });
      }
      return (
        <div>
          <Table
            title={() => <div>{''}</div>}
            dataSource={[{ note: record.note }]}
            columns={[this.getColumn(messages.commonFieldNote, 'note')]}
            pagination={false}
          />
          <Table
            title={() => <h4>{messages.recalculationsServicesTitle}</h4>}
            dataSource={serviceCalculationInfoDataSource}
            columns={serviceCalculationInfoColumns}
            pagination={false}
          />
        </div>
      );
    };
    let owners = '';
    let ownersDataSource = [];
    if (object && object.owners && object.owners.length > 0 && this.props.selectedWorkingPeriod) {
      ownersDataSource = this.getListForPeriod(object.owners, this.props.selectedWorkingPeriod).sort((a, b) => {
        return new Date(b.dateStart) - new Date(a.dateStart);
      });
      ownersDataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = Math.random();
        owners += `${owners ? '; ' : ''}${obj.citizen.lastName} ${obj.citizen.firstName} ${obj.citizen.fatherName}`;
      });
    }
    const ownersColumns = [
      this.getColumn(messages.citizenFieldFirstName, 'citizen.firstName'),
      this.getColumn(messages.citizenFieldLastName, 'citizen.lastName'),
      this.getColumn(messages.citizenFieldFatherName, 'citizen.fatherName'),
      this.getColumn(messages.citizenFieldBirthday, 'citizen.birthday'),
      this.getDateColumn(messages.commonFieldDateStart, 'dateStart'),
      this.getDateColumn(messages.commonFieldDateEnd, 'dateEnd'),
      this.getActionSimpleColumn('citizen', messages.buttonEdit, CitizenPath.CITIZEN_EDIT),
    ];
    let registeredCount = 0;
    let registeredDataSource = [];
    if (object && object.registered && object.registered.length > 0 && this.props.selectedWorkingPeriod) {
      registeredDataSource = this.getListForPeriod(object.registered, this.props.selectedWorkingPeriod).sort((a, b) => {
        return new Date(b.dateStart) - new Date(a.dateStart);
      });
      registeredDataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = Math.random();
      });
      registeredCount = registeredDataSource.length;
    }
    const registeredColumns = [
      this.getColumn(messages.citizenFieldFirstName, 'citizen.firstName'),
      this.getColumn(messages.citizenFieldLastName, 'citizen.lastName'),
      this.getColumn(messages.citizenFieldFatherName, 'citizen.fatherName'),
      this.getColumn(messages.citizenFieldBirthday, 'citizen.birthday'),
      this.getColumn(messages.registrationTypeFieldName, 'registrationType.name'),
      this.getDateColumn(messages.commonFieldDateStart, 'dateStart'),
      this.getDateColumn(messages.commonFieldDateEnd, 'dateEnd'),
      this.getActionSimpleColumn('citizen', messages.buttonEdit, CitizenPath.CITIZEN_EDIT),
    ];
    let metersDataSource = [];
    if (object && object.meters && object.meters.length > 0 && this.props.selectedWorkingPeriod) {
      metersDataSource = this.getListForPeriod(object.meters, this.props.selectedWorkingPeriod).sort((a, b) => {
        return new Date(b.dateStart) - new Date(a.dateStart);
      });
      metersDataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = Math.random();
      });
    }
    const metersColumns = [
      this.getColumn(messages.serviceFieldName, 'meter.service.name'),
      this.getColumn(messages.meterFieldName, 'meter.name'),
      this.getColumn(messages.meterFieldSerialNumber, 'meter.serialNumber'),
      this.getDateColumn(messages.commonFieldDateStart, 'dateStart'),
      this.getDateColumn(messages.commonFieldDateEnd, 'dateEnd'),
      this.getActionSimpleColumn('meter', messages.buttonEdit, MeterPath.METER_EDIT),
    ];
    const getActionCalculationColumn = (onDelete, currentWorkingPeriod) => {
      return {
        title: messages.tableColumnActions,
        key: 'action',
        render(text, record) {
          if (record.workingPeriod.id !== currentWorkingPeriod.id) return null;
          return (
            <span>
              <Popconfirm title={messages.confirmDelete} onConfirm={() => onDelete(record)} >
                <Link><FormattedMessage id="buttonDelete" /></Link>
              </Popconfirm>
            </span>
          );
        },
      };
    };
    const paymentsColumns = [
      this.getDateTimeColumn(messages.paymentFieldDate, 'date'),
      this.getColumn(messages.workingPeriodFieldTitle, 'workingPeriod.name'),
      this.getColumn(messages.commonFieldSum, 'sum'),
      getActionCalculationColumn(this.props.onDeleteAccountPayment, this.props.currentWorkingPeriod),
    ];
    const recalculationsColumns = [
      this.getDateTimeColumn(messages.recalculationFieldDate, 'date'),
      this.getColumn(messages.workingPeriodFieldTitle, 'workingPeriod.name'),
      this.getColumn(messages.forWorkingPeriodFieldTitle, 'forWorkingPeriod.name'),
      this.getColumn(messages.commonFieldSum, 'sum'),
      this.getColumn(messages.recalculationTypeFieldName, 'recalculationType.name'),
      getActionCalculationColumn(this.props.onDeleteAccountRecalculation, this.props.currentWorkingPeriod),
    ];
    let address = '';
    if (object && object.id) {
      address += `${object.apartment.building.street.streetType.nameShort} `;
      address += `${object.apartment.building.street.name}, `;
      address += `${messages.buildingFieldHouse.toLowerCase()} `;
      address += `${object.apartment.building.house}, `;
      address += `${messages.apartmentFieldApartment.toLowerCase()} `;
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
          <h1>{titleItem}</h1>
          <Spin spinning={this.props.isLoadingAddAccountPayment || this.props.isLoadingAddAccountRecalculation || this.props.accountIsCalculating}>
            <h2>{messages.operationsTitle}</h2>
            <Row gutter={10}>
              <Col className="gutter-row" span={6}>
                <Button size="large" className="full-width" onClick={() => this.props.showFormAddPayment()} loading={this.props.isLoadingAddAccountPayment}>
                  <FormattedMessage id="buttonAddPayment" />
                </Button>
              </Col>
              <Col className="gutter-row" span={6}>
                <Button size="large" className="full-width" onClick={() => this.props.showFormAddRecalculation()} loading={this.props.isLoadingAddAccountRecalculation}>
                  <FormattedMessage id="buttonAddRecalculation" />
                </Button>
              </Col>
              <Col className="gutter-row" span={6}>
                <Button size="large" className="full-width" onClick={() => this.props.showFormCalculation()} loading={this.props.accountIsCalculating}>
                  <FormattedMessage id="buttonCalculateAccount" />
                </Button>
              </Col>
              <Col className="gutter-row" span={6}>
                <Button size="large" className="full-width" onClick={() => this.props.showFormReport()}>
                  <FormattedMessage id="buttonExecuteReportUPD" />
                </Button>
              </Col>
            </Row>
            <h2>{messages.workingPeriodFieldTitle}</h2>
            <Form>
              <FormItem>
                {this.getSelectField('name', workingPeriodsList ? this.props.selectedWorkingPeriod : null, workingPeriodsList, this.changeWorkingPeriod, false)}
              </FormItem>
            </Form>
          </Spin>
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            <h2>{messages.accountDataTitle}</h2>
            <Row gutter={16}>
              <Col className="gutter-row" span={4}>
                <FormItem label={messages.accountFieldAccountNumber}>
                  {this.getInputField('accountNumber', object.accountNumber, false, true)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={8}>
                <FormItem label={messages.addressShortTitle}>
                  {this.getInputField('address', address, false, true)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={4}>
                <FormItem label={messages.apartmentFieldRoomsNumber}>
                  {this.getInputField('roomsNumber', object.apartment.roomsNumber, false, true)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={4}>
                <FormItem label={messages.apartmentFieldTotalArea}>
                  {this.getInputField('accountTotalArea', accountTotalArea, false, true)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={4}>
                <FormItem label={messages.registeredCountTitle}>
                  {this.getInputField('registeredCount', registeredCount, false, true)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <FormItem label={messages.ownersTitle}>
                  {this.getInputField('owners', owners, false, true)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={12}>
                <FormItem label={messages.phoneNumbersTitle}>
                  {this.getInputField('accountPhoneNumbers', accountPhoneNumbers, false, true)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={16}>
                <FormItem label={messages.managementCompanyTitle}>
                  {this.getInputField('contractor', object.contractor.fullName, false, true)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={4}>
                <FormItem label={messages.accountFieldDateOpen}>
                  {this.getInputField('dateOpen', object.dateOpen, false, true)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={4}>
                <FormItem label={messages.accountFieldDateClose}>
                  {this.getInputField('dateClose', object.dateClose, false, true)}
                </FormItem>
              </Col>
            </Row>
            <Tabs>
              <TabPane tab={messages.calculationsTitle} key="1">
                <Table
                  dataSource={calculationsDataSource}
                  columns={calculationsColumns}
                  bordered
                  pagination={false}
                  size="small"
                  className="table-with-aggregation-data"
                  loading={this.props.isLoadingAccountCalculation}
                />
              </TabPane>
              <TabPane tab={messages.paymentsTitle} key="2">
                {
                  this.getTableComponent(
                    paymentsColumns,
                    expandedPaymentRowRender,
                    this.props.payments,
                    this.props.isLoadingAccountPayments,
                    this.props.onChangeAccountPaymentPage,
                    true,
                    'small'
                  )
                }
              </TabPane>
              <TabPane tab={messages.recalculationsTitle} key="3">
                {
                  this.getTableComponent(
                    recalculationsColumns,
                    expandedRecalculationRowRender,
                    this.props.recalculations,
                    this.props.isLoadingAccountRecalculations,
                    this.props.onChangeAccountRecalculationPage,
                    true,
                    'small'
                  )
                }
              </TabPane>
              <TabPane tab={messages.ownersTitle} key="4">
                <Table
                  className="table-nested"
                  dataSource={ownersDataSource}
                  columns={ownersColumns}
                  bordered
                  pagination={false}
                  size="small"
                  expandedRowRender={expandedOwnerRowRender}
                />
              </TabPane>
              <TabPane tab={messages.registeredTitle} key="5">
                <Table
                  className="table-nested"
                  dataSource={registeredDataSource}
                  columns={registeredColumns}
                  bordered
                  pagination={false}
                  size="small"
                  expandedRowRender={expandedRegisteredRowRender}
                />
              </TabPane>
              <TabPane tab={messages.metersTitle} key="6">
                <Table
                  className="table-nested"
                  dataSource={metersDataSource}
                  columns={metersColumns}
                  bordered
                  pagination={false}
                  size="small"
                  expandedRowRender={expandedMeterRowRender}
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
