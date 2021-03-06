import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button } from 'antd';

import * as ServicePath from './../paths/ServicePath';
import { ListComponent } from './../../../components/ListComponent';

class ServiceList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.serviceTypeFieldName, 'serviceType.name'),
      this.getColumn(this.props.intl.messages.serviceFieldName, 'name'),
      this.getActionColumn(ServicePath.SERVICE_EDIT),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="servicesTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="servicesTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="servicesTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(ServicePath.SERVICE_EDIT)}>
          <FormattedMessage id="buttonCreateService" />
        </Button>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(ServiceList);
