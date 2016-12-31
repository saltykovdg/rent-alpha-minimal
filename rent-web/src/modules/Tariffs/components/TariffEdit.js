import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin, Select, Table, Popconfirm } from 'antd';
import moment from 'moment';

import * as ObjectUtil from './../../../util/ObjectUtil';
import { emptyTariffValue } from './../reducers/TariffReducer';
import * as TariffPath from './../paths/TariffPath';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD';

class TariffEdit extends EditComponent {
  getDateColumn = (title, name) => {
    return {
      title,
      key: name,
      render(text, record) {
        return record[name] ? moment(record[name]).format(dateFormat) : '';
      },
    };
  }
  getTariffValuesActionColumn = () => {
    const messages = this.props.intl.messages;
    const onEditTariffValue = this.onEditTariffValue;
    const onDeleteTariffValue = this.onDeleteTariffValue;
    return {
      title: this.props.intl.messages.tableColumnActions,
      key: 'action',
      render(text, record) {
        return (
          <span>
            <Link onClick={() => onEditTariffValue(record)}><FormattedMessage id="buttonEdit" /></Link>
            <span className="ant-divider" />
            <Popconfirm title={messages.confirmDelete} onConfirm={() => onDeleteTariffValue(record)} >
              <Link><FormattedMessage id="buttonDelete" /></Link>
            </Popconfirm>
          </span>
        );
      },
    };
  };
  onEditTariffValue = (tariffValue = emptyTariffValue) => {
    this.props.showFormTariffValueEdit(ObjectUtil.cloneObject(tariffValue));
  }
  onDeleteTariffValue = (record) => {
    this.props.onDeleteTariffValue(ObjectUtil.cloneObject(record));
  };
  render() {
    const object = this.props.data;
    const titleItem = this.props.id ? <FormattedMessage id="editPageEditTitle" /> : <FormattedMessage id="editPageCreateTitle" />;
    const baseFields = this.getBaseFields(object);
    let services = null;
    if (this.props.services && this.props.services.content) {
      services = this.props.services.content.map(service => (
        <Select.Option key={service.id} value={this.getLink(service)}>{service.name}</Select.Option>
      ));
    }
    let tariffValuesDataSource = [];
    if (object && object.values && object.values.length > 0) {
      tariffValuesDataSource = object.values.sort((a, b) => {
        return moment(b.dateStart).unix() - moment(a.dateStart).unix();
      });
    }
    const tariffValuesColumns = [{
      title: this.props.intl.messages.calculationTypeFieldName,
      dataIndex: 'calculationType.name',
      key: 'calculationType.name',
    }, {
      title: this.props.intl.messages.measurementUnitFieldName,
      dataIndex: 'measurementUnit.name',
      key: 'measurementUnit.name',
    }, {
      title: this.props.intl.messages.commonFieldValue,
      dataIndex: 'value',
      key: 'value',
    },
      this.getDateColumn(this.props.intl.messages.commonFieldDateStart, 'dateStart'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateEnd, 'dateEnd'),
      this.getTariffValuesActionColumn(),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><Link to={TariffPath.TARIFF_LIST}><FormattedMessage id="tariffsTitle" /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>{titleItem}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{titleItem}</h1>
        <Spin spinning={this.props.isLoading}>
          <Form vertical onSubmit={this.handleSubmit}>
            {baseFields}
            <FormItem label={this.props.intl.messages.serviceFieldName}>
              {this.getSelectField('service', object.service, services)}
            </FormItem>
            <FormItem label={this.props.intl.messages.tariffFieldName}>
              {this.getInputField('name', object.name)}
            </FormItem>
            <h2>{this.props.intl.messages.tariffValuesTitle}</h2>
            <Button size="small" style={{ marginBottom: '5px' }} onClick={() => this.onEditTariffValue()}>
              <FormattedMessage id="buttonAddNewValue" />
            </Button>
            <Table
              dataSource={tariffValuesDataSource}
              columns={tariffValuesColumns}
              bordered pagination={false}
              size="small"
            />
            <br />
            <FormItem>
              <Button type="primary" htmlType="submit"><FormattedMessage id="buttonSave" /></Button>
              <Button className="pull-right" onClick={() => this.forwardTo(TariffPath.TARIFF_LIST)}>
                <FormattedMessage id="buttonCancel" />
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(injectIntl(TariffEdit));
