import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button } from 'antd';

import * as AccountPath from './../paths/AccountPath';
import { ListComponent } from './../../../components/ListComponent';

class AccountList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.accountFieldAccountNumber, 'accountNumber'),
      this.getActionColumn(AccountPath.ACCOUNT_EDIT),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="accountsTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="accountsTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(AccountPath.ACCOUNT_EDIT)}>
          <FormattedMessage id="buttonAddNewRecord" />
        </Button>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(AccountList);
