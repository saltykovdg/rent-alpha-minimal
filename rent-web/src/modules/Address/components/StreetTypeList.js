import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button } from 'antd';

import * as AddressPath from './../AddressPaths';
import { ListComponent } from './../../../components/ListComponent';

class StreetTypeList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.streetTypeFieldName, 'name'),
      this.getColumn(this.props.intl.messages.streetTypeFieldNameShort, 'nameShort'),
      this.getActionColumn(AddressPath.STREET_TYPE_EDIT),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="addressTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="streetTypeTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="streetTypeTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(AddressPath.STREET_TYPE_EDIT)}>
          <FormattedMessage id="buttonCreateStreetType" />
        </Button>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(StreetTypeList);
