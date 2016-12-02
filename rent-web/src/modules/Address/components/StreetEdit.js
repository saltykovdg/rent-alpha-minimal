import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin, Select } from 'antd';

import * as AddressPath from './../AddressPaths';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class StreetEdit extends EditComponent {
  render() {
    const object = this.props.data;
    const titleItem = this.props.id ? <FormattedMessage id="editPageEditTitle" /> : <FormattedMessage id="editPageCreateTitle" />;
    const baseFields = this.getBaseFields(object);
    let values = null;
    if (this.props.streetTypes && this.props.streetTypes.content) {
      values = this.props.streetTypes.content.map(streetType => (
        <Select.Option key={streetType.id} value={this.getLink(streetType)}>{streetType.name}</Select.Option>
      ));
    }
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="addressTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={AddressPath.STREET_LIST}><FormattedMessage id="streetTitle" /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>{titleItem}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{titleItem}</h1>
        <Spin spinning={this.props.isLoading}>
          <Form vertical onSubmit={this.handleSubmit}>
            {baseFields}
            <FormItem label={this.props.intl.messages.streetTypeFieldName}>
              {this.getSelectField('streetType', object.streetType, values)}
            </FormItem>
            <FormItem label={this.props.intl.messages.streetFieldName}>
              {this.getInputField('name', object.name)}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit"><FormattedMessage id="buttonSave" /></Button>
              <Button className="pull-right" onClick={() => this.forwardTo(AddressPath.STREET_LIST)}>
                <FormattedMessage id="buttonCancel" />
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(injectIntl(StreetEdit));
