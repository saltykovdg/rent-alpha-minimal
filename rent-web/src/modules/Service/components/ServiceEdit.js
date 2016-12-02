import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin, Select } from 'antd';

import * as ServicePath from './../paths/ServicePath';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class ServiceEdit extends EditComponent {
  render() {
    const object = this.props.data;
    const titleItem = this.props.id ? <FormattedMessage id="editPageEditTitle" /> : <FormattedMessage id="editPageCreateTitle" />;
    const baseFields = this.getBaseFields(object);
    let values = null;
    if (this.props.serviceTypes && this.props.serviceTypes.content) {
      values = this.props.serviceTypes.content.map(serviceType => (
        <Select.Option key={serviceType.id} value={this.getLink(serviceType)}>{serviceType.name}</Select.Option>
      ));
    }
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="serviceTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={ServicePath.SERVICE_LIST}><FormattedMessage id="serviceTitle" /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>{titleItem}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{titleItem}</h1>
        <Spin spinning={this.props.isLoading}>
          <Form vertical onSubmit={this.handleSubmit}>
            {baseFields}
            <FormItem label={this.props.intl.messages.serviceTypeFieldName}>
              {this.getSelectField('serviceType', object.serviceType, values)}
            </FormItem>
            <FormItem label={this.props.intl.messages.serviceFieldName}>
              {this.getInputField('name', object.name)}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit"><FormattedMessage id="buttonSave" /></Button>
              <Button className="pull-right" onClick={() => this.forwardTo(ServicePath.SERVICE_LIST)}>
                <FormattedMessage id="buttonCancel" />
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(injectIntl(ServiceEdit));
