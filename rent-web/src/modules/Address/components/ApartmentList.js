import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Row, Col, Input } from 'antd';

import * as AddressPath from './../AddressPaths';
import { ListComponent } from './../../../components/ListComponent';

class ApartmentList extends ListComponent {
  handlerSearch = () => {
    const findStreet = this.findStreet.refs.input.value;
    const findHouse = this.findHouse.refs.input.value;
    const findApartment = this.findApartment.refs.input.value;
    this.props.onSearch(findStreet, findHouse, findApartment);
  }
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.streetFieldName, 'building.street.name'),
      this.getColumn(this.props.intl.messages.buildingFieldHouse, 'building.house'),
      this.getColumn(this.props.intl.messages.apartmentFieldApartment, 'apartment'),
      this.getColumn(this.props.intl.messages.apartmentFieldEntrance, 'entrance'),
      this.getColumn(this.props.intl.messages.apartmentFieldFloor, 'floor'),
      this.getColumn(this.props.intl.messages.apartmentFieldTotalArea, 'totalArea'),
      this.getColumn(this.props.intl.messages.apartmentFieldLivingArea, 'livingArea'),
      this.getColumn(this.props.intl.messages.apartmentFieldRoomsNumber, 'roomsNumber'),
      this.getActionColumn(AddressPath.APARTMENT_EDIT),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="addressTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="apartmentTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="apartmentTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(AddressPath.APARTMENT_EDIT)}>
          <FormattedMessage id="buttonAddNewRecord" />
        </Button>
        <h2><FormattedMessage id="filtersTitle" /></h2>
        <Row gutter={10}>
          <Col className="gutter-row" span={3}>
            <Input placeholder={this.props.intl.messages.streetFieldName} ref={(node) => { this.findStreet = node; }} onPressEnter={() => this.handlerSearch()} />
          </Col>
          <Col className="gutter-row" span={3}>
            <Input placeholder={this.props.intl.messages.buildingFieldHouse} ref={(node) => { this.findHouse = node; }} onPressEnter={() => this.handlerSearch()} />
          </Col>
          <Col className="gutter-row" span={3}>
            <Input placeholder={this.props.intl.messages.apartmentFieldApartment} ref={(node) => { this.findApartment = node; }} onPressEnter={() => this.handlerSearch()} />
          </Col>
          <Col className="gutter-row" span={1}>
            <Button icon="search" onClick={() => this.handlerSearch()}>
              <FormattedMessage id="buttonFind" />
            </Button>
          </Col>
        </Row>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(ApartmentList);
