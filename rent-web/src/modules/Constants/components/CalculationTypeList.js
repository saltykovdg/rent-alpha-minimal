import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon } from 'antd';

import * as CalculationTypePath from './../paths/CalculationTypePath';
import { ListComponent } from './../../../components/ListComponent';

class CalculationTypeList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.calculationTypeFieldName, 'name'),
      this.getActionColumn(CalculationTypePath.CALCULATION_TYPE_EDIT, false),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="constantsTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="calculationTypeTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="calculationTypeTitle" />
        </h1>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(CalculationTypeList);
