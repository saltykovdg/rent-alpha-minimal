import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin } from 'antd';

import * as RolePath from './../paths/RolePath';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class RoleEdit extends EditComponent {
  render() {
    const object = this.props.data;
    const titleItem = <FormattedMessage id="editPageEditRoleTitle" />;
    const baseFields = this.getBaseFields(object);
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="securityTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={RolePath.ROLE_LIST}><FormattedMessage id="rolesTitle" /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>{titleItem}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{titleItem}</h1>
        <Spin spinning={this.props.isLoading}>
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            {baseFields}
            <FormItem label={this.props.intl.messages.roleFieldName}>
              {this.getInputField('name', object.name, true, true)}
            </FormItem>
            <FormItem label={this.props.intl.messages.roleFieldDescription}>
              {this.getInputField('description', object.description)}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit"><FormattedMessage id="buttonSave" /></Button>
              <Button className="pull-right" onClick={() => this.forwardTo(RolePath.ROLE_LIST)}>
                <FormattedMessage id="buttonCancel" />
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(injectIntl(RoleEdit));
