import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Input, Icon, Button, Form, Checkbox, Alert } from 'antd';

import './LoginForm.less';

const FormItem = Form.Item;

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onLogin(values);
      }
    });
  }
  render() {
    const messages = this.props.intl.messages;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-form">
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <FormItem style={this.props.isRequestError ? { 'margin-bottom': '5px', 'line-height': '0px' } : null}>
            <div className="login-form-title">
              <FormattedMessage id="appTitle" />
            </div>
          </FormItem>
          {this.props.isRequestError ? <Alert message={messages.wrongLoginOrPasswordTitle} type="error" /> : null}
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: messages.usernameFieldError }],
            })(
              <Input prefix={<Icon type="user" />} placeholder={messages.usernameField} />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: messages.passwordFieldErrorTitle }],
            })(
              <Input prefix={<Icon type="lock" />} type="password" placeholder={messages.passwordField} />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>
                <FormattedMessage id="rememberMeField" />
              </Checkbox>
            )}
            <Button type="primary" htmlType="submit" className="login-form-button">
              <FormattedMessage id="buttonLogin" />
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  form: PropTypes.objectOf(PropTypes.shape),
  intl: PropTypes.objectOf(PropTypes.shape),
  onLogin: PropTypes.func,
  isRequestError: PropTypes.any,
};

LoginForm.defaultProps = {
  form: {},
  intl: { messages: {} },
  onLogin: () => {},
  isRequestError: false,
};

export default Form.create()(injectIntl(LoginForm));
