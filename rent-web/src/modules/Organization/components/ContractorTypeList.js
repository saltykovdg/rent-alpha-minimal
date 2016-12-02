import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button } from 'antd';

import * as OrganizationPath from './../OrganizationPaths';
import { ListComponent } from './../../../components/ListComponent';

class ContractorTypeList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.contractorTypeFieldName, 'name'),
      this.getColumn(this.props.intl.messages.contractorTypeFieldNameShort, 'nameShort'),
      this.getActionColumn(OrganizationPath.CONTRACTOR_TYPE_EDIT),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="organizationTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="contractorTypeTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="contractorTypeTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(OrganizationPath.CONTRACTOR_TYPE_EDIT)}>
          <FormattedMessage id="buttonAddNewRecord" />
        </Button>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(ContractorTypeList);
