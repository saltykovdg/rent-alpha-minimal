import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin, Select, Table } from 'antd';

import * as NormPath from './../paths/NormPath';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class NormEdit extends EditComponent {
  render() {
    const object = this.props.data;
    const titleItem = this.props.id ? <FormattedMessage id="editPageEditNormTitle" /> : <FormattedMessage id="editPageCreateNormTitle" />;
    const baseFields = this.getBaseFields(object);
    let services = null;
    if (this.props.services && this.props.services.content) {
      services = this.props.services.content.map(service => (
        <Select.Option key={service.id} value={this.getLink(service)}>{service.name}</Select.Option>
      ));
    }
    let normValuesDataSource = [];
    if (object && object.values && object.values.length > 0) {
      normValuesDataSource = object.values.sort((a, b) => {
        return new Date(b.dateStart) - new Date(a.dateStart);
      });
      normValuesDataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = newObj.id;
      });
    }
    const normValuesColumns = [
      this.getColumn(this.props.intl.messages.measurementUnitFieldName, 'measurementUnit.name'),
      this.getColumn(this.props.intl.messages.commonFieldValue, 'value'),
      this.getColumn(this.props.intl.messages.commonFieldDateStart, 'dateStart'),
      this.getColumn(this.props.intl.messages.commonFieldDateEnd, 'dateEnd'),
      this.getActionColumn(this.props.showFormNormValueEdit, this.props.onDeleteNormValue),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><Link to={NormPath.NORM_LIST}><FormattedMessage id="normsTitle" /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>{titleItem}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{titleItem}</h1>
        <Spin spinning={this.props.isLoading}>
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            {baseFields}
            <FormItem label={this.props.intl.messages.serviceFieldName}>
              {this.getSelectField('service', object.service, services)}
            </FormItem>
            <FormItem label={this.props.intl.messages.normFieldName}>
              {this.getInputField('name', object.name)}
            </FormItem>
            <h2>{this.props.intl.messages.normValuesTitle}</h2>
            <Button size="small" onClick={() => this.props.showFormNormValueEdit()}>
              <FormattedMessage id="buttonAddNewValue" />
            </Button>
            <Table
              dataSource={normValuesDataSource}
              columns={normValuesColumns}
              bordered pagination={false}
              size="small"
            />
            <FormItem>
              <Button type="primary" htmlType="submit"><FormattedMessage id="buttonSave" /></Button>
              <Button className="pull-right" onClick={() => this.forwardTo(NormPath.NORM_LIST)}>
                <FormattedMessage id="buttonCancel" />
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(injectIntl(NormEdit));
