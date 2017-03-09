import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin, Select, Table } from 'antd';

import * as TariffPath from './../paths/TariffPath';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class TariffEdit extends EditComponent {
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
        return new Date(b.dateStart) - new Date(a.dateStart);
      });
      tariffValuesDataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = newObj.id;
      });
    }
    const tariffValuesColumns = [
      this.getColumn(this.props.intl.messages.calculationTypeFieldName, 'calculationType.name'),
      this.getColumn(this.props.intl.messages.measurementUnitFieldName, 'measurementUnit.name'),
      this.getColumn(this.props.intl.messages.commonFieldValue, 'value'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateStart, 'dateStart'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateEnd, 'dateEnd'),
      this.getActionColumn(this.props.showFormTariffValueEdit, this.props.onDeleteTariffValue),
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
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            {baseFields}
            <FormItem label={this.props.intl.messages.serviceFieldName}>
              {this.getSelectField('service', object.service, services)}
            </FormItem>
            <FormItem label={this.props.intl.messages.tariffFieldName}>
              {this.getInputField('name', object.name)}
            </FormItem>
            <h2>{this.props.intl.messages.tariffValuesTitle}</h2>
            <Button size="small" style={{ marginBottom: '5px' }} onClick={() => this.props.showFormTariffValueEdit()}>
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
