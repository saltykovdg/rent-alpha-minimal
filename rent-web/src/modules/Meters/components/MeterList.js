import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button } from 'antd';

import * as MeterPath from './../paths/MeterPath';
import { ListComponent } from './../../../components/ListComponent';

class MeterList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.meterTypeFieldName, 'meterType.name'),
      this.getColumn(this.props.intl.messages.serviceFieldName, 'service.name'),
      this.getColumn(this.props.intl.messages.meterFieldName, 'name'),
      this.getColumn(this.props.intl.messages.meterFieldSerialNumber, 'serialNumber'),
      this.getActionColumn(MeterPath.METER_EDIT),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="metersTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="metersTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(MeterPath.METER_EDIT)}>
          <FormattedMessage id="buttonAddNewRecord" />
        </Button>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(MeterList);
