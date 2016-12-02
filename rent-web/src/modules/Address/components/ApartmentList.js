import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button } from 'antd';

import * as AddressPath from './../AddressPaths';
import { ListComponent } from './../../../components/ListComponent';

class ApartmentList extends ListComponent {
  handlerSearch = () => {
    const findStreetNameValue = this.findStreetName.input.refs.input.value;
    const findBuildingNameValue = this.findBuildingName.input.refs.input.value;
    this.props.onSearch(findStreetNameValue, findBuildingNameValue);
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
        {this.getFilterField(this.props.intl.messages.findByStreetNamePlaceholder, (node) => { this.findStreetName = node; }, this.handlerSearch)}
        {this.getFilterField(this.props.intl.messages.findByBuildingNamePlaceholder, (node) => { this.findBuildingName = node; }, this.handlerSearch)}
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(ApartmentList);
