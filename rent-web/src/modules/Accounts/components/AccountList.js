import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Row, Col, Input, Popconfirm } from 'antd';

import * as AccountPath from './../paths/AccountPath';
import { ListComponent } from './../../../components/ListComponent';

class AccountList extends ListComponent {
  handlerSearch = () => {
    const findAccountNumber = this.findAccountNumber.refs.input.value;
    const findLastName = this.findLastName.refs.input.value;
    const findStreet = this.findStreet.refs.input.value;
    const findHouse = this.findHouse.refs.input.value;
    const findApartment = this.findApartment.refs.input.value;
    this.props.onSearch(findAccountNumber, findLastName, findStreet, findHouse, findApartment);
  }
  getActionColumn = () => {
    const messages = this.props.intl.messages;
    const onDelete = this.props.onDelete;
    return {
      title: this.props.intl.messages.tableColumnActions,
      key: 'action',
      render(text, record) {
        return (
          <span>
            <Link to={`${AccountPath.ACCOUNT_CARD}/${record.id}`}><FormattedMessage id="buttonCard" /></Link>
            <span className="ant-divider" />
            <Link to={`${AccountPath.ACCOUNT_EDIT}/${record.id}`}><FormattedMessage id="buttonEdit" /></Link>
            <span className="ant-divider" />
            <Popconfirm title={messages.confirmDelete} onConfirm={() => onDelete(record)} >
              <Link><FormattedMessage id="buttonDelete" /></Link>
            </Popconfirm>
          </span>
        );
      },
    };
  }
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.managementCompanyTitle, 'contractor.name'),
      this.getColumn(this.props.intl.messages.accountFieldAccountNumber, 'accountNumber'),
      this.getColumn(this.props.intl.messages.accountFieldDateOpen, 'dateOpen'),
      this.getColumn(this.props.intl.messages.accountFieldDateClose, 'dateClose'),
      this.getActionColumn(),
    ];
    const expandedRowRender = (record) => {
      const messages = this.props.intl.messages;
      const currentOwners = this.getListForCurrentPeriod(record.owners).map(owner => (
        <div key={Math.random()}>{owner.citizen.lastName} {owner.citizen.firstName} {owner.citizen.fatherName}</div>
      ));
      const currentRegistered = this.getListForCurrentPeriod(record.registered).map(registered => (
        <div key={Math.random()}>{registered.citizen.lastName} {registered.citizen.firstName} {registered.citizen.fatherName}</div>
      ));
      return (
        <div>
          <Row gutter={10}>
            <Col className="gutter-row" span={6}>
              <h4>{messages.addressShortTitle}</h4>
              {record.apartment.building.street.streetType.nameShort}&nbsp;
              {record.apartment.building.street.name},&nbsp;
              {messages.buildingFieldHouse.toLowerCase()}&nbsp;
              {record.apartment.building.house},&nbsp;
              {messages.apartmentFieldApartment.toLowerCase()}&nbsp;
              {record.apartment.apartment}&nbsp;
            </Col>
            <Col className="gutter-row" span={6}>
              <h4>{messages.ownersTitle}</h4>
              {currentOwners}
            </Col>
            <Col className="gutter-row" span={6}>
              <h4>{messages.registeredTitle}</h4>
              {currentRegistered}
            </Col>
            <Col className="gutter-row" span={6}>
              <h4>{messages.apartmentFieldTotalArea}</h4>
              {this.getAccountTotalAreaForCurrentPeriod(record)}
            </Col>
          </Row>
        </div>
      );
    };
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="accountsTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="accountsTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(AccountPath.ACCOUNT_EDIT)}>
          <FormattedMessage id="buttonCreateAccount" />
        </Button>
        <h2><FormattedMessage id="filtersTitle" /></h2>
        <Row gutter={10}>
          <Col className="gutter-row" span={4}>
            <Input placeholder={this.props.intl.messages.accountFieldAccountNumber} ref={(node) => { this.findAccountNumber = node; }} onPressEnter={() => this.handlerSearch()} />
          </Col>
          <Col className="gutter-row" span={4}>
            <Input placeholder={this.props.intl.messages.citizenFieldLastName} ref={(node) => { this.findLastName = node; }} onPressEnter={() => this.handlerSearch()} />
          </Col>
          <Col className="gutter-row" span={4}>
            <Input placeholder={this.props.intl.messages.streetFieldName} ref={(node) => { this.findStreet = node; }} onPressEnter={() => this.handlerSearch()} />
          </Col>
          <Col className="gutter-row" span={4}>
            <Input placeholder={this.props.intl.messages.buildingFieldHouse} ref={(node) => { this.findHouse = node; }} onPressEnter={() => this.handlerSearch()} />
          </Col>
          <Col className="gutter-row" span={4}>
            <Input placeholder={this.props.intl.messages.apartmentFieldApartment} ref={(node) => { this.findApartment = node; }} onPressEnter={() => this.handlerSearch()} />
          </Col>
          <Col className="gutter-row" span={4}>
            <Button icon="search" onClick={() => this.handlerSearch()} className="full-width">
              <FormattedMessage id="buttonFind" />
            </Button>
          </Col>
        </Row>
        {this.getTableComponent(columns, expandedRowRender)}
      </div>
    );
  }
}

export default injectIntl(AccountList);
