import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button } from 'antd';

import * as OrganizationPath from './../OrganizationPaths';
import { ListComponent } from './../../../components/ListComponent';

class ContractorList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.contractorTypeFieldName, 'contractorType.name'),
      this.getColumn(this.props.intl.messages.contractorFieldName, 'name'),
      this.getColumn(this.props.intl.messages.contractorFieldInn, 'inn'),
      this.getColumn(this.props.intl.messages.contractorFieldPhone, 'phone'),
      this.getActionColumn(OrganizationPath.CONTRACTOR_EDIT),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="organizationTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="contractorTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="contractorTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(OrganizationPath.CONTRACTOR_EDIT)}>
          <FormattedMessage id="buttonAddNewRecord" />
        </Button>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(ContractorList);
