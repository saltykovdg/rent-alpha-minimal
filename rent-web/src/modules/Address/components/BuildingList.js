import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Row, Col, Input } from 'antd';

import * as AddressPath from './../AddressPaths';
import { ListComponent } from './../../../components/ListComponent';

class BuildingList extends ListComponent {
  handlerSearch = () => {
    const findStreet = this.findStreet.refs.input.value;
    const findHouse = this.findHouse.refs.input.value;
    this.props.onSearch(findStreet, findHouse);
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
          <FormattedMessage id="buttonCreateBuilding" />
        </Button>
        <h2><FormattedMessage id="filtersTitle" /></h2>
        <Row gutter={10}>
          <Col className="gutter-row" span={8}>
            <Input placeholder={this.props.intl.messages.streetFieldName} ref={(node) => { this.findStreet = node; }} onPressEnter={() => this.handlerSearch()} />
          </Col>
          <Col className="gutter-row" span={8}>
            <Input placeholder={this.props.intl.messages.buildingFieldHouse} ref={(node) => { this.findHouse = node; }} onPressEnter={() => this.handlerSearch()} />
          </Col>
          <Col className="gutter-row" span={8}>
            <Button icon="search" onClick={() => this.handlerSearch()} className="full-width">
              <FormattedMessage id="buttonFind" />
            </Button>
          </Col>
        </Row>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(BuildingList);
