import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin, Select } from 'antd';

import * as UserPath from './../paths/UserPath';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class UserEdit extends EditComponent {
  render() {
    const object = this.props.data;
    const titleItem = this.props.id ? <FormattedMessage id="editPageEditUserTitle" /> : <FormattedMessage id="editPageCreateUserTitle" />;
    const baseFields = this.getBaseFields(object);
    let roles = null;
    if (this.props.roles && this.props.roles.content) {
      roles = this.props.roles.content.map(role => (
        <Select.Option key={role.id} value={this.getLink(role)}>{role.description}</Select.Option>
      ));
    }
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="securityTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={UserPath.USER_LIST}><FormattedMessage id="usersTitle" /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>{titleItem}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{titleItem}</h1>
        <Spin spinning={this.props.isLoading}>
          <Form layout="horizontal" onSubmit={this.handleSubmit} autoComplete="off">
            {baseFields}
            <FormItem label={this.props.intl.messages.userFieldLogin}>
              {this.getInputField('login', object.login, true, object.login === 'admin')}
            </FormItem>
            <FormItem label={this.props.intl.messages.userFieldPassword}>
              {this.getPasswordField('password', object.password)}
            </FormItem>
            <FormItem label={this.props.intl.messages.roleFieldName}>
              {this.getSelectField('role', roles != null ? object.role : null, roles, () => {}, true, object.login === 'admin')}
            </FormItem>
            <FormItem label={this.props.intl.messages.userFieldFirstName}>
              {this.getInputField('firstName', object.firstName)}
            </FormItem>
            <FormItem label={this.props.intl.messages.userFieldLastName}>
              {this.getInputField('lastName', object.lastName)}
            </FormItem>
            <FormItem label={this.props.intl.messages.userFieldFatherName}>
              {this.getInputField('fatherName', object.fatherName)}
            </FormItem>
            <FormItem label={this.props.intl.messages.userFieldEmail}>
              {this.getInputField('email', object.email)}
            </FormItem>
            <FormItem>
              {this.getCheckboxField('blocked', object.blocked, this.props.intl.messages.userFieldBlocked)}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit"><FormattedMessage id="buttonSave" /></Button>
              <Button className="pull-right" onClick={() => this.forwardTo(UserPath.USER_LIST)}>
                <FormattedMessage id="buttonCancel" />
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(injectIntl(UserEdit));
