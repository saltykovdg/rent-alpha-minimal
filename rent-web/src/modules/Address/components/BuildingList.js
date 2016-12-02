import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button } from 'antd';

import * as AddressPath from './../AddressPaths';
import { ListComponent } from './../../../components/ListComponent';

class BuildingList extends ListComponent {
  handlerSearch = (value) => {
    this.props.onSearch(value);
  }
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.streetFieldName, 'street.name'),
      this.getColumn(this.props.intl.messages.buildingFieldHouse, 'house'),
      this.getColumn(this.props.intl.messages.buildingFieldHouseNumber, 'houseNumber'),
      this.getColumn(this.props.intl.messages.buildingFieldHousing, 'housing'),
      this.getActionColumn(AddressPath.BUILDING_EDIT),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="addressTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="buildingTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="buildingTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(AddressPath.BUILDING_EDIT)}>
          <FormattedMessage id="buttonAddNewRecord" />
        </Button>
        {this.getFilterField(this.props.intl.messages.findByStreetNamePlaceholder, (node) => { this.findStreetName = node; }, this.handlerSearch)}
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(BuildingList);
