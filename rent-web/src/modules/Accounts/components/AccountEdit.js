import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Breadcrumb, Icon, Button, Form, Spin,
  Select, Row, Col, Table, Popconfirm,
} from 'antd';
import moment from 'moment';

import { getDefaultParameter, getDefaultService } from './../reducers/AccountReducer';
import * as AccountPath from './../paths/AccountPath';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD';

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
  onDeleteParameter = (record) => {
    this.props.onDeleteParameter(record);
  };
  onDeleteService = (record) => {
    this.props.onDeleteService(record);
  };
  getDateColumn = (title, name) => {
    return {
      title,
      key: name,
      render(text, record) {
        return record[name] ? moment(record[name]).format(dateFormat) : '';
      },
    };
  }
  getParameterActionColumn = () => {
    const messages = this.props.intl.messages;
    const onEditParameter = this.onEditParameter;
    const onDeleteParameter = this.onDeleteParameter;
    return {
      title: this.props.intl.messages.tableColumnActions,
      key: 'action',
      render(text, record) {
        return (
          <span>
            <Link onClick={() => onEditParameter(record)}><FormattedMessage id="buttonEdit" /></Link>
            <span className="ant-divider" />
            <Popconfirm title={messages.confirmDelete} onConfirm={() => onDeleteParameter(record)} >
              <Link><FormattedMessage id="buttonDelete" /></Link>
            </Popconfirm>
          </span>
        );
      },
    };
  };
  getServiceActionColumn = () => {
    const messages = this.props.intl.messages;
    const onEditService = this.onEditService;
    const onDeleteService = this.onDeleteService;
    return {
      title: this.props.intl.messages.tableColumnActions,
      key: 'action',
      render(text, record) {
        return (
          <span>
            <Link onClick={() => onEditService(record)}><FormattedMessage id="buttonEdit" /></Link>
            <span className="ant-divider" />
            <Popconfirm title={messages.confirmDelete} onConfirm={() => onDeleteService(record)} >
              <Link><FormattedMessage id="buttonDelete" /></Link>
            </Popconfirm>
          </span>
        );
      },
    };
  };
  onEditParameter = (parameter = getDefaultParameter()) => {
    this.props.showFormParameterEdit(parameter);
  }
  onEditService = (service = getDefaultService()) => {
    this.props.showFormServiceEdit(service);
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
    let parametersDataSource = [];
    if (object && object.parameters && object.parameters.length > 0) {
      parametersDataSource = object.parameters.sort((a, b) => {
        return moment(b.dateStart).unix() - moment(a.dateStart).unix();
      });
    }
    const parametersColumns = [{
      title: this.props.intl.messages.parameterTypeFieldName,
      dataIndex: 'parameterType.name',
      key: 'parameterType.name',
    }, {
      title: this.props.intl.messages.commonFieldValue,
      dataIndex: 'value',
      key: 'value',
    },
      this.getDateColumn(this.props.intl.messages.commonFieldDateStart, 'dateStart'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateEnd, 'dateEnd'),
      this.getParameterActionColumn(),
    ];
    let servicesDataSource = [];
    if (object && object.services && object.services.length > 0) {
      servicesDataSource = object.services.sort((a, b) => {
        return moment(b.dateStart).unix() - moment(a.dateStart).unix();
      });
    }
    const servicesColumns = [{
      title: this.props.intl.messages.serviceFieldName,
      dataIndex: 'service.name',
      key: 'service.name',
    },
      this.getDateColumn(this.props.intl.messages.commonFieldDateStart, 'dateStart'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateEnd, 'dateEnd'),
    {
      title: this.props.intl.messages.tariffFieldName,
      dataIndex: 'tariff.name',
      key: 'tariff.name',
    },
      this.getServiceActionColumn(),
    ];
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
            <h2>{this.props.intl.messages.parameterTitle}</h2>
            <Button size="small" style={{ marginBottom: '5px' }} onClick={() => this.onEditParameter()}>
              <FormattedMessage id="buttonAddNewParameter" />
            </Button>
            <Table
              dataSource={parametersDataSource}
              columns={parametersColumns}
              bordered pagination={false}
              size="small"
            />
            <br />
            <h2>{this.props.intl.messages.servicesTitle}</h2>
            <Button size="small" style={{ marginBottom: '5px' }} onClick={() => this.onEditService()}>
              <FormattedMessage id="buttonAddNewService" />
            </Button>
            <Table
              dataSource={servicesDataSource}
              columns={servicesColumns}
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
