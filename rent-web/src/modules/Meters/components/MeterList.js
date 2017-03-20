import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Row, Col, Input } from 'antd';

import * as MeterPath from './../paths/MeterPath';
import { ListComponent } from './../../../components/ListComponent';

class MeterList extends ListComponent {
  handlerSearch = () => {
    const findMeterTypeValue = this.findMeterType.refs.input.value;
    const findServiceValue = this.findService.refs.input.value;
    const findNameValue = this.findName.refs.input.value;
    const findSerialNumberValue = this.findSerialNumber.refs.input.value;
    this.props.onSearch(findMeterTypeValue, findServiceValue, findNameValue, findSerialNumberValue);
  }
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.meterTypeFieldName, 'meterType.name'),
      this.getColumn(this.props.intl.messages.serviceFieldName, 'service.name'),
      this.getColumn(this.props.intl.messages.meterFieldName, 'name'),
      this.getColumn(this.props.intl.messages.meterFieldSerialNumber, 'serialNumber'),
      this.getActionColumn(MeterPath.METER_EDIT),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="metersTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="metersTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(MeterPath.METER_EDIT)}>
          <FormattedMessage id="buttonAddNewRecord" />
        </Button>
        <h2><FormattedMessage id="filtersTitle" /></h2>
        <Row gutter={10}>
          <Col className="gutter-row" span={3}>
            <Input placeholder={this.props.intl.messages.meterTypeFieldName} ref={(node) => { this.findMeterType = node; }} onPressEnter={() => this.handlerSearch()} />
          </Col>
          <Col className="gutter-row" span={3}>
            <Input placeholder={this.props.intl.messages.serviceFieldName} ref={(node) => { this.findService = node; }} onPressEnter={() => this.handlerSearch()} />
          </Col>
          <Col className="gutter-row" span={3}>
            <Input placeholder={this.props.intl.messages.meterFieldName} ref={(node) => { this.findName = node; }} onPressEnter={() => this.handlerSearch()} />
          </Col>
          <Col className="gutter-row" span={3}>
            <Input placeholder={this.props.intl.messages.meterFieldSerialNumber} ref={(node) => { this.findSerialNumber = node; }} onPressEnter={() => this.handlerSearch()} />
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

export default injectIntl(MeterList);
