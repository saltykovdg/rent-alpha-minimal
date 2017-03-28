import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Form, Modal, Row, Col, Button, Table, Alert } from 'antd';

import { EditComponent } from './EditComponent';

const FormItem = Form.Item;

const MAX_METERS_PER_PAGE_SIZE = 5;

class EditTiedMeterForm extends EditComponent {
  constructor(props, context) {
    super(props, context);
    this.state = { selectMeterError: false };
  }
  onOk = () => {
    const meter = this.props.tiedMeter.meter;
    if (meter) {
      this.props.form.validateFields((error, values) => {
        if (!error && !this.props.isLoading) {
          const newValues = values;
          newValues.meter = meter;
          this.props.onOkFormMeterEdit(newValues);
        }
      });
    } else {
      this.setState({ selectMeterError: true });
    }
  }
  onCancel = () => {
    this.props.onCancelFormMeterEdit(this.props.tiedMeter);
  }
  afterClose = () => {
    this.props.clearLocalDataMeters();
    this.props.form.resetFields();
    this.setState({ selectMeterError: false });
  }
  onSearchMeters = (page = 0) => {
    const serviceSearchField = this.props.form.getFieldValue('serviceSearchField');
    const nameSearchField = this.props.form.getFieldValue('nameSearchField');
    const serialNumberSearchField = this.props.form.getFieldValue('serialNumberSearchField');
    this.props.onSearchMeters(
      serviceSearchField,
      nameSearchField,
      serialNumberSearchField,
      page,
      MAX_METERS_PER_PAGE_SIZE,
    );
  }
  onSelectMeter = (meter) => {
    this.props.tiedMeter.meter = meter;
    this.setState({ selectMeterError: false });
    this.forceUpdate();
  }
  onChangeMeterClick = () => {
    this.props.tiedMeter.meter = null;
    this.forceUpdate();
  }
  getActionMeterColumn = (onSelect) => {
    return {
      title: this.props.intl.messages.tableColumnActions,
      key: 'action',
      render(text, record) {
        return (
          <span>
            <Link onClick={() => onSelect(record)}><FormattedMessage id="buttonSelect" /></Link>
          </span>
        );
      },
    };
  }
  getTableMeterComponent() {
    const columns = [
      this.getColumn(this.props.intl.messages.serviceFieldName, 'service.name'),
      this.getColumn(this.props.intl.messages.meterFieldName, 'name'),
      this.getColumn(this.props.intl.messages.meterFieldSerialNumber, 'serialNumber'),
      this.getActionMeterColumn(this.onSelectMeter),
    ];
    let dataSource = [];
    const onSearchMeters = this.onSearchMeters;
    let pagination = false;
    const meters = this.props.meters;
    if (meters && meters.content) {
      dataSource = meters.content;
      dataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = newObj.id;
      });
      if (meters.page) {
        if (meters.page.totalPages > 1) {
          pagination = {
            total: meters.page.totalElements,
            current: meters.page.number + 1,
            pageSize: meters.page.size,
            onChange(current) {
              pagination.current = current;
              onSearchMeters(current - 1);
            },
          };
        }
      }
    }
    return (
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        loading={this.props.isLoading}
        size="small" bordered
      />
    );
  }
  render() {
    const object = this.props.tiedMeter;
    const titleItem = this.props.title;
    const baseFields = this.getBaseFields(object);
    const panelSearchVisible = !object.meter;
    return (
      <Modal
        visible={this.props.formMeterEditVisible}
        title={titleItem}
        okText={object && object.id ? this.props.intl.messages.buttonApply : this.props.intl.messages.buttonAdd}
        onOk={this.onOk}
        onCancel={this.onCancel}
        afterClose={this.afterClose}
        closable={false}
        maskClosable={false}
      >
        {panelSearchVisible ?
          <Form layout="horizontal">
            {this.state.selectMeterError ? <Alert message={this.props.intl.messages.selectMeterErrorTitle} type="error" /> : null}
            <Row gutter={10}>
              <Col className="gutter-row" span={12}>
                <FormItem label={this.props.intl.messages.serviceFieldName}>
                  {this.getInputField('serviceSearchField', '', false)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={12}>
                <FormItem label={this.props.intl.messages.meterFieldName}>
                  {this.getInputField('nameSearchField', '', false)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col className="gutter-row" span={12}>
                <FormItem label={this.props.intl.messages.meterFieldSerialNumber}>
                  {this.getInputField('serialNumberSearchField', '', false)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={12}>
                <FormItem label=" " colon={false}>
                  <Button type="primary" htmlType="submit" className="full-width" onClick={() => this.onSearchMeters()}>
                    <FormattedMessage id="buttonFind" />
                  </Button>
                </FormItem>
              </Col>
            </Row>
            {this.getTableMeterComponent()}
          </Form> :
          <Form layout="horizontal">
            {baseFields}
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <FormItem label={this.props.intl.messages.serviceFieldName}>
                  {this.getInputField('meterServiceName', object.meter.service.name, false, true)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={12}>
                <FormItem label={this.props.intl.messages.meterFieldName}>
                  {this.getInputField('meterName', object.meter.name, false, true)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <FormItem label={this.props.intl.messages.meterFieldSerialNumber}>
                  {this.getInputField('meterName', object.meter.serialNumber, false, true)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={12}>
                <FormItem label=" " colon={false}>
                  <Button type="default" htmlType="submit" className="full-width" onClick={() => this.onChangeMeterClick()}>
                    <FormattedMessage id="buttonChange" />
                  </Button>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <FormItem label={this.props.intl.messages.commonFieldDateStart}>
                  {this.getDateField('dateStart', object.dateStart)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={12}>
                <FormItem label={this.props.intl.messages.commonFieldDateEnd}>
                  {this.getDateField('dateEnd', object.dateEnd, false)}
                </FormItem>
              </Col>
            </Row>
          </Form>
        }
      </Modal>
    );
  }
}

export default Form.create()(injectIntl(EditTiedMeterForm));
