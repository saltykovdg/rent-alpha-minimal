import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Input, Row, Col } from 'antd';

import * as CitizenPath from './../paths/CitizenPath';
import { ListComponent } from './../../../components/ListComponent';

class CitizenList extends ListComponent {
  handlerSearch = () => {
    const findFirstNameValue = this.findFirstName.refs.input.value;
    const findLastNameValue = this.findLastName.refs.input.value;
    const findFatherNameValue = this.findFatherName.refs.input.value;
    const findSeriesValue = this.findSeries.refs.input.value;
    const findNumberValue = this.findNumber.refs.input.value;
    this.props.onSearch(findFirstNameValue, findLastNameValue, findFatherNameValue, findSeriesValue, findNumberValue);
  }
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.citizenFieldGenderType, 'genderType.name'),
      this.getColumn(this.props.intl.messages.citizenFieldFirstName, 'firstName'),
      this.getColumn(this.props.intl.messages.citizenFieldLastName, 'lastName'),
      this.getColumn(this.props.intl.messages.citizenFieldFatherName, 'fatherName'),
      this.getColumn(this.props.intl.messages.citizenFieldBirthday, 'birthday'),
      this.getActionColumn(CitizenPath.CITIZEN_EDIT),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="citizensTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="citizensTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(CitizenPath.CITIZEN_EDIT)}>
          <FormattedMessage id="buttonCreateCitizen" />
        </Button>
        <h2><FormattedMessage id="filtersTitle" /></h2>
        <Row gutter={10}>
          <Col className="gutter-row" span={4}>
            <Input placeholder={this.props.intl.messages.citizenFieldFirstName} ref={(node) => { this.findFirstName = node; }} onPressEnter={() => this.handlerSearch()} />
          </Col>
          <Col className="gutter-row" span={4}>
            <Input placeholder={this.props.intl.messages.citizenFieldLastName} ref={(node) => { this.findLastName = node; }} onPressEnter={() => this.handlerSearch()} />
          </Col>
          <Col className="gutter-row" span={4}>
            <Input placeholder={this.props.intl.messages.citizenFieldFatherName} ref={(node) => { this.findFatherName = node; }} onPressEnter={() => this.handlerSearch()} />
          </Col>
          <Col className="gutter-row" span={4}>
            <Input placeholder={this.props.intl.messages.documentFieldSeries} ref={(node) => { this.findSeries = node; }} onPressEnter={() => this.handlerSearch()} />
          </Col>
          <Col className="gutter-row" span={4}>
            <Input placeholder={this.props.intl.messages.documentFieldNumber} ref={(node) => { this.findNumber = node; }} onPressEnter={() => this.handlerSearch()} />
          </Col>
          <Col className="gutter-row" span={4}>
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

export default injectIntl(CitizenList);
