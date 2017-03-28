import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button } from 'antd';

import * as ServiceTypePath from './../paths/ServiceTypePath';
import { ListComponent } from './../../../components/ListComponent';

class ServiceTypeList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.serviceTypeFieldName, 'name'),
      this.getActionColumn(ServiceTypePath.SERVICE_TYPE_EDIT),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="servicesTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="serviceTypeTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="serviceTypeTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(ServiceTypePath.SERVICE_TYPE_EDIT)}>
          <FormattedMessage id="buttonCreateServiceType" />
        </Button>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(ServiceTypeList);
