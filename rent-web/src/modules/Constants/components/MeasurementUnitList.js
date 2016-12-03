import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon } from 'antd';

import * as MeasurementUnitPath from './../paths/MeasurementUnitPath';
import { ListComponent } from './../../../components/ListComponent';

class MeasurementUnitList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.measurementUnitFieldName, 'name'),
      this.getActionColumn(MeasurementUnitPath.MEASUREMENT_UNIT_EDIT, false),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="constantsTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="measurementUnitTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="measurementUnitTitle" />
        </h1>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(MeasurementUnitList);
