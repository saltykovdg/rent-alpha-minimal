import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button } from 'antd';

import * as RegistrationTypePath from './../paths/RegistrationTypePath';
import { ListComponent } from './../../../components/ListComponent';

class RegistrationTypeList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.registrationTypeFieldName, 'name'),
      this.getActionColumn(RegistrationTypePath.REGISTRATION_TYPE_EDIT),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="constantsTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="registrationTypeTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="registrationTypeTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(RegistrationTypePath.REGISTRATION_TYPE_EDIT)}>
          <FormattedMessage id="buttonCreateRegistrationType" />
        </Button>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(RegistrationTypeList);
