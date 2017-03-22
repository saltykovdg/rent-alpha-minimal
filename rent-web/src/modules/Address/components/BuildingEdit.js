import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin, Select, Table } from 'antd';

import * as AddressPath from './../AddressPaths';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class BuildingEdit extends EditComponent {
  render() {
    const object = this.props.data;
    const titleItem = this.props.id ? <FormattedMessage id="editPageEditTitle" /> : <FormattedMessage id="editPageCreateTitle" />;
    const baseFields = this.getBaseFields(object);
    let values = null;
    if (this.props.streets && this.props.streets.content) {
      values = this.props.streets.content.map(street => (
        <Select.Option key={street.id} value={this.getLink(street)}>{street.name}</Select.Option>
      ));
    }
    let metersDataSource = [];
    if (object && object.meters && object.meters.length > 0) {
      metersDataSource = object.meters.sort((a, b) => {
        return new Date(b.dateStart) - new Date(a.dateStart);
      });
      metersDataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = newObj.id;
      });
    }
    const metersColumns = [
      this.getColumn(this.props.intl.messages.serviceFieldName, 'meter.service.name'),
      this.getColumn(this.props.intl.messages.meterFieldName, 'meter.name'),
      this.getColumn(this.props.intl.messages.meterFieldSerialNumber, 'meter.serialNumber'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateStart, 'dateStart'),
      this.getDateColumn(this.props.intl.messages.commonFieldDateEnd, 'dateEnd'),
      this.getActionColumn(this.props.showFormMeterEdit, this.props.onDeleteMeter),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="addressTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={AddressPath.BUILDING_LIST}><FormattedMessage id="buildingTitle" /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>{titleItem}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{titleItem}</h1>
        <Spin spinning={this.props.isLoading}>
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            {baseFields}
            <FormItem label={this.props.intl.messages.streetFieldName}>
              {this.getSelectWithSearchField('street', this.getLink(object.street), values)}
            </FormItem>
            <FormItem label={this.props.intl.messages.buildingFieldHouse}>
              {this.getInputField('house', object.house)}
            </FormItem>
            <FormItem label={this.props.intl.messages.buildingFieldHouseNumber}>
              {this.getInputNumberField('houseNumber', object.houseNumber)}
            </FormItem>
            <FormItem label={this.props.intl.messages.buildingFieldHousing}>
              {this.getInputField('housing', object.housing, false)}
            </FormItem>
            <h2>{this.props.intl.messages.metersTitle}</h2>
            <Button size="small" style={{ marginBottom: '5px' }} onClick={() => this.props.showFormMeterEdit()}>
              <FormattedMessage id="buttonAddNewMeter" />
            </Button>
            <Table
              dataSource={metersDataSource}
              columns={metersColumns}
              bordered pagination={false}
              size="small"
            />
            <br />
            <FormItem>
              <Button type="primary" htmlType="submit"><FormattedMessage id="buttonSave" /></Button>
              <Button className="pull-right" onClick={() => this.forwardTo(AddressPath.BUILDING_LIST)}>
                <FormattedMessage id="buttonCancel" />
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(injectIntl(BuildingEdit));
