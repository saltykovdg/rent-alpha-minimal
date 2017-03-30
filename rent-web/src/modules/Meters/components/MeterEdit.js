import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin, Select, Table } from 'antd';

import * as MeterPath from './../paths/MeterPath';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class MeterEdit extends EditComponent {
  render() {
    const object = this.props.data;
    const titleItem = this.props.id ? <FormattedMessage id="editPageEditMeterTitle" /> : <FormattedMessage id="editPageCreateMeterTitle" />;
    const baseFields = this.getBaseFields(object);
    let meterTypes = null;
    if (this.props.meterTypes && this.props.meterTypes.content) {
      meterTypes = this.props.meterTypes.content.map(meterType => (
        <Select.Option key={meterType.id} value={this.getLink(meterType)}>{meterType.name}</Select.Option>
      ));
    }
    let services = null;
    if (this.props.services && this.props.services.content) {
      services = this.props.services.content.map(service => (
        <Select.Option key={service.id} value={this.getLink(service)}>{service.name}</Select.Option>
      ));
    }
    let meterValuesDataSource = [];
    if (object && object.values && object.values.length > 0) {
      meterValuesDataSource = object.values.sort((a, b) => {
        return new Date(b.dateValue) - new Date(a.dateValue);
      });
      meterValuesDataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = newObj.id;
      });
    }
    const meterValuesColumns = [
      this.getColumn(this.props.intl.messages.meterFieldValue, 'value'),
      this.getColumn(this.props.intl.messages.meterFieldConsumption, 'consumption'),
      this.getColumn(this.props.intl.messages.meterFieldDateValue, 'dateValue'),
      this.getActionColumn(this.props.showFormMeterValueEdit, this.props.onDeleteMeterValue),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><Link to={MeterPath.METER_LIST}><FormattedMessage id="metersTitle" /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>{titleItem}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{titleItem}</h1>
        <Spin spinning={this.props.isLoading}>
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            {baseFields}
            <FormItem label={this.props.intl.messages.meterTypeFieldName}>
              {this.getSelectField('meterType', object.meterType, meterTypes)}
            </FormItem>
            <FormItem label={this.props.intl.messages.serviceFieldName}>
              {this.getSelectField('service', object.service, services)}
            </FormItem>
            <FormItem label={this.props.intl.messages.meterFieldName}>
              {this.getInputField('name', object.name)}
            </FormItem>
            <FormItem label={this.props.intl.messages.meterFieldSerialNumber}>
              {this.getInputField('serialNumber', object.serialNumber)}
            </FormItem>
            <h2>{this.props.intl.messages.meterValuesTitle}</h2>
            <Button size="small" onClick={() => this.props.showFormMeterValueEdit()}>
              <FormattedMessage id="buttonAddNewValueMeter" />
            </Button>
            <Table
              dataSource={meterValuesDataSource}
              columns={meterValuesColumns}
              bordered pagination={false}
              size="small"
            />
            <FormItem>
              <Button type="primary" htmlType="submit"><FormattedMessage id="buttonSave" /></Button>
              <Button className="pull-right" onClick={() => this.forwardTo(MeterPath.METER_LIST)}>
                <FormattedMessage id="buttonCancel" />
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(injectIntl(MeterEdit));
