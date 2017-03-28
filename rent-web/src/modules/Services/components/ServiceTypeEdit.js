import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin } from 'antd';

import * as ServiceTypePath from './../paths/ServiceTypePath';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class ServiceTypeEdit extends EditComponent {
  render() {
    const object = this.props.data;
    const titleItem = this.props.id ? <FormattedMessage id="editPageEditServiceTypeTitle" /> : <FormattedMessage id="editPageCreateServiceTypeTitle" />;
    const baseFields = this.getBaseFields(object);
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="servicesTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={ServiceTypePath.SERVICE_TYPE_LIST}><FormattedMessage id="serviceTypeTitle" /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>{titleItem}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{titleItem}</h1>
        <Spin spinning={this.props.isLoading}>
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            {baseFields}
            <FormItem label={this.props.intl.messages.serviceTypeFieldName}>
              {this.getInputField('name', object.name)}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit"><FormattedMessage id="buttonSave" /></Button>
              <Button className="pull-right" onClick={() => this.forwardTo(ServiceTypePath.SERVICE_TYPE_LIST)}>
                <FormattedMessage id="buttonCancel" />
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(injectIntl(ServiceTypeEdit));
