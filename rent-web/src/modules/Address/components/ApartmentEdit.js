import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin, Select, Row, Col } from 'antd';

import * as AddressPath from './../AddressPaths';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class ApartmentEdit extends EditComponent {
  onStreetChange = (value) => {
    this.props.form.setFieldsValue({ building: '' });
    this.props.onStreetChange(value);
  }
  render() {
    const object = this.props.data;
    if (this.props.id) {
      object.totalArea = parseFloat(object.totalArea);
      object.livingArea = parseFloat(object.livingArea);
    }
    const titleItem = this.props.id ? <FormattedMessage id="editPageEditTitle" /> : <FormattedMessage id="editPageCreateTitle" />;
    const baseFields = this.getBaseFields(object);
    let streets = null;
    if (this.props.streets && this.props.streets.content) {
      streets = this.props.streets.content.map(street => (
        <Select.Option key={street.id} value={street.id}>{street.name}</Select.Option>
      ));
    }
    let buildings = null;
    if (this.props.buildings && this.props.buildings.content) {
      buildings = this.props.buildings.content.map(building => (
        <Select.Option key={building.id} value={this.getLink(building)}>{building.house}</Select.Option>
      ));
    }
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="addressTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={AddressPath.APARTMENT_LIST}><FormattedMessage id="apartmentTitle" /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>{titleItem}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{titleItem}</h1>
        <Spin spinning={this.props.isLoading}>
          <Form vertical onSubmit={this.handleSubmit}>
            {baseFields}
            <FormItem label={this.props.intl.messages.streetFieldName}>
              {this.getSelectWithSearchField('street', object.building.street.id, streets, this.onStreetChange)}
            </FormItem>
            <FormItem label={this.props.intl.messages.buildingFieldHouse}>
              {this.getSelectWithSearchField('building', this.getLink(object.building), buildings)}
            </FormItem>
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <FormItem label={this.props.intl.messages.apartmentFieldApartment}>
                  {this.getInputField('apartment', object.apartment)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={6}>
                <FormItem label={this.props.intl.messages.apartmentFieldApartmentNumber}>
                  {this.getInputNumberField('apartmentNumber', object.apartmentNumber)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={6}>
                <FormItem label={this.props.intl.messages.apartmentFieldApartmentLetter}>
                  {this.getInputField('apartmentLetter', object.apartmentLetter, false)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={6}>
                <FormItem label={this.props.intl.messages.apartmentFieldRoomsNumber}>
                  {this.getInputNumberField('roomsNumber', object.roomsNumber)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <FormItem label={this.props.intl.messages.apartmentFieldEntrance}>
                  {this.getInputNumberField('entrance', object.entrance)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={6}>
                <FormItem label={this.props.intl.messages.apartmentFieldFloor}>
                  {this.getInputNumberField('floor', object.floor)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={6}>
                <FormItem label={this.props.intl.messages.apartmentFieldTotalArea}>
                  {this.getInputNumberField('totalArea', object.totalArea, 0.1)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={6}>
                <FormItem label={this.props.intl.messages.apartmentFieldLivingArea}>
                  {this.getInputNumberField('livingArea', object.livingArea, 0.1)}
                </FormItem>
              </Col>
            </Row>
            <FormItem>
              <Button type="primary" htmlType="submit"><FormattedMessage id="buttonSave" /></Button>
              <Button className="pull-right" onClick={() => this.forwardTo(AddressPath.APARTMENT_LIST)}>
                <FormattedMessage id="buttonCancel" />
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(injectIntl(ApartmentEdit));
