import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon } from 'antd';

import * as RolePath from './../paths/RolePath';
import { ListComponent } from './../../../components/ListComponent';

class RoleList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.roleFieldName, 'name'),
      this.getColumn(this.props.intl.messages.roleFieldDescription, 'description'),
      this.getActionColumn(RolePath.ROLE_EDIT, false),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="securityTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="rolesTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="rolesTitle" />
        </h1>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(RoleList);
