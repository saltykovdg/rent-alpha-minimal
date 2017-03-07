import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin, Select } from 'antd';

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
