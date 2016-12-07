import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin, Select, Row, Col, Table } from 'antd';

import * as AccountPath from './../paths/AccountPath';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class AccountEdit extends EditComponent {
  onStreetChange = (value) => {
    this.props.form.setFieldsValue({ building: '' });
    this.props.form.setFieldsValue({ apartment: '' });
    this.props.onStreetChange(value);
  }
  onBuildingChange = (value) => {
    this.props.form.setFieldsValue({ apartment: '' });
    this.props.onBuildingChange(value);
  }
  render() {
    const object = this.props.data;
    const titleItem = this.props.id ? <FormattedMessage id="editPageEditTitle" /> : <FormattedMessage id="editPageCreateTitle" />;
    const baseFields = this.getBaseFields(object);
    let contractorsList = null;
    if (this.props.contractors && this.props.contractors.content) {
      contractorsList = this.props.contractors.content.map(contractor => (
        <Select.Option key={contractor.id} value={this.getLink(contractor)}>{contractor.name}</Select.Option>
      ));
      if (!this.props.id) {
        object.contractor = this.props.contractors.content[0];
      }
    }
    let streetList = null;
    if (this.props.streets && this.props.streets.content) {
      streetList = this.props.streets.content.map(street => (
        <Select.Option key={street.id} value={street.id}>{street.name}</Select.Option>
      ));
    }
    let buildingList = null;
    if (this.props.buildings && this.props.buildings.content) {
      buildingList = this.props.buildings.content.map(building => (
        <Select.Option key={building.id} value={building.id}>{building.house}</Select.Option>
      ));
    }
    let apartmentList = null;
    if (this.props.apartments && this.props.apartments.content) {
      apartmentList = this.props.apartments.content.map(apartment => (
        <Select.Option key={apartment.id} value={this.getLink(apartment)}>{apartment.apartment}</Select.Option>
      ));
    }
    const dataSource = [{
      key: '1',
      param: 'Общая площадь',
      paramValue: '53.6',
      dateStart: '01.05.2016',
      dateEnd: '',
    }];
    const columns = [{
      title: 'Параметр',
      dataIndex: 'param',
      key: 'param',
    }, {
      title: 'Значение',
      dataIndex: 'paramValue',
      key: 'paramValue',
    }, {
      title: 'Действует С',
      dataIndex: 'dateStart',
      key: 'dateStart',
    }, {
      title: 'Действует ПО',
      dataIndex: 'dateEnd',
      key: 'dateEnd',
    }, {
      title: 'Действия',
    }];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><Link to={AccountPath.ACCOUNT_LIST}><FormattedMessage id="accountsTitle" /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>{titleItem}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{titleItem}</h1>
        <Spin spinning={this.props.isLoading}>
          <Form vertical onSubmit={this.handleSubmit}>
            {baseFields}
            <Row gutter={16}>
              <Col className="gutter-row" span={8}>
                <FormItem label={this.props.intl.messages.accountFieldAccountNumber}>
                  {this.getInputField('accountNumber', object.accountNumber)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={8}>
                <FormItem label={this.props.intl.messages.accountFieldDateOpen}>
                  {this.getDateField('dateOpen', object.dateOpen)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={8}>
                <FormItem label={this.props.intl.messages.accountFieldDateClose}>
                  {this.getDateField('dateClose', object.dateClose, false)}
                </FormItem>
              </Col>
            </Row>
            <h2>{this.props.intl.messages.managementCompanyTitle}</h2>
            <FormItem label={this.props.intl.messages.contractorFieldName}>
              {this.getSelectWithSearchField('contractor', this.getLink(object.contractor), contractorsList)}
            </FormItem>
            <h2>{this.props.intl.messages.addressShortTitle}</h2>
            <Row gutter={16}>
              <Col className="gutter-row" span={8}>
                <FormItem label={this.props.intl.messages.streetFieldName}>
                  {this.getSelectWithSearchField('street', object.apartment.building.street.id, streetList, this.onStreetChange)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={8}>
                <FormItem label={this.props.intl.messages.buildingFieldHouse}>
                  {this.getSelectWithSearchField('building', object.apartment.building.id, buildingList, this.onBuildingChange)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={8}>
                <FormItem label={this.props.intl.messages.apartmentFieldApartment}>
                  {this.getSelectWithSearchField('apartment', this.getLink(object.apartment), apartmentList)}
                </FormItem>
              </Col>
            </Row>
            <h2>{this.props.intl.messages.parametersTitle}</h2>
            <Button size="small" style={{ marginBottom: '5px' }}>Добавить параметр [Общая площадь]</Button>
            <Table
              dataSource={dataSource}
              columns={columns}
              bordered pagination={false}
              size="small"
            />
            <br />
            <FormItem>
              <Button type="primary" htmlType="submit"><FormattedMessage id="buttonSave" /></Button>
              <Button className="pull-right" onClick={() => this.forwardTo(AccountPath.ACCOUNT_LIST)}>
                <FormattedMessage id="buttonCancel" />
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(injectIntl(AccountEdit));
