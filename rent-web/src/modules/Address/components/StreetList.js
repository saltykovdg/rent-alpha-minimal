import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button } from 'antd';

import * as AddressPath from './../AddressPaths';
import { ListComponent } from './../../../components/ListComponent';

class StreetList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.streetTypeFieldName, 'streetType.name'),
      this.getColumn(this.props.intl.messages.streetFieldName, 'name'),
      this.getActionColumn(AddressPath.STREET_EDIT),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="addressTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="streetTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="streetTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(AddressPath.STREET_EDIT)}>
          <FormattedMessage id="buttonAddNewRecord" />
        </Button>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(StreetList);
