import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button } from 'antd';

import * as MeterTypePath from './../paths/MeterTypePath';
import { ListComponent } from './../../../components/ListComponent';

class MeterTypeList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.meterTypeFieldName, 'name'),
      this.getActionColumn(MeterTypePath.METER_TYPE_EDIT, false),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="constantsTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="meterTypeTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="meterTypeTitle" />
        </h1>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(MeterTypeList);
