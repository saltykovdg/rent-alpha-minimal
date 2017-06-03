import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Popconfirm } from 'antd';

import * as UserPath from './../paths/UserPath';
import { ListComponent } from './../../../components/ListComponent';

class UserList extends ListComponent {
  getActionColumn = (editPath, useButtonDelete = true) => {
    const messages = this.props.intl.messages;
    const onDelete = this.props.onDelete;
    const buttonDelete = (record) => {
      return (
        <Popconfirm title={messages.confirmDelete} onConfirm={() => onDelete(record)} >
          <Link><FormattedMessage id="buttonDelete" /></Link>
        </Popconfirm>
      );
    };
    return {
      title: this.props.intl.messages.tableColumnActions,
      key: 'action',
      render(text, record) {
        return (
          <span>
            <Link to={`${editPath}/${record.id}`}><FormattedMessage id="buttonEdit" /></Link>
            { useButtonDelete && record.login !== 'admin' ? <span className="ant-divider" /> : null }
            { useButtonDelete && record.login !== 'admin' ? buttonDelete(record) : null }
          </span>
        );
      },
    };
  }
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.userFieldLogin, 'login'),
      this.getColumn(this.props.intl.messages.roleFieldName, 'role.description'),
      this.getColumn(this.props.intl.messages.userFieldLastName, 'lastName'),
      this.getColumn(this.props.intl.messages.userFieldFirstName, 'firstName'),
      this.getColumn(this.props.intl.messages.userFieldFatherName, 'fatherName'),
      this.getColumn(this.props.intl.messages.userFieldEmail, 'email'),
      this.getCheckboxColumn(this.props.intl.messages.userFieldBlocked, 'blocked'),
      this.getActionColumn(UserPath.USER_EDIT),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="securityTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="usersTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="usersTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(UserPath.USER_EDIT)}>
          <FormattedMessage id="buttonCreateUser" />
        </Button>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(UserList);
