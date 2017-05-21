import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon } from 'antd';

import * as RecalculationTypePath from './../paths/RecalculationTypePath';
import { ListComponent } from './../../../components/ListComponent';

class RecalculationTypeList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.recalculationTypeFieldName, 'name'),
      this.getActionColumn(RecalculationTypePath.RECALCULATION_TYPE_EDIT, false),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="constantsTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="recalculationTypeTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="recalculationTypeTitle" />
        </h1>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(RecalculationTypeList);
