import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Row, Col, Input } from 'antd';

import * as AddressPath from './../AddressPaths';
import { ListComponent } from './../../../components/ListComponent';

class StreetList extends ListComponent {
  handlerSearch = () => {
    const findStreetType = this.findStreetType.refs.input.value;
    const findStreet = this.findStreet.refs.input.value;
    this.props.onSearch(findStreetType, findStreet);
  }
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.streetTypeFieldName, 'streetType.name'),
      this.getColumn(this.props.intl.messages.streetFieldName, 'name'),
      this.getActionColumn(AddressPath.STREET_EDIT),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="addressTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="streetTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="streetTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(AddressPath.STREET_EDIT)}>
          <FormattedMessage id="buttonAddNewRecord" />
        </Button>
        <h2><FormattedMessage id="filtersTitle" /></h2>
        <Row gutter={10}>
          <Col className="gutter-row" span={3}>
            <Input placeholder={this.props.intl.messages.streetTypeFieldName} ref={(node) => { this.findStreetType = node; }} onPressEnter={() => this.handlerSearch()} />
          </Col>
          <Col className="gutter-row" span={3}>
            <Input placeholder={this.props.intl.messages.streetFieldName} ref={(node) => { this.findStreet = node; }} onPressEnter={() => this.handlerSearch()} />
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

export default injectIntl(StreetList);
