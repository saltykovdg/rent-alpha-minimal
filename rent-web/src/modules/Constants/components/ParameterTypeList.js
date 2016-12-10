import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon } from 'antd';

import * as ParameterTypePath from './../paths/ParameterTypePath';
import { ListComponent } from './../../../components/ListComponent';

class ParameterTypeList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.parameterTypeFieldName, 'name'),
      this.getActionColumn(ParameterTypePath.PARAMETER_TYPE_EDIT, false),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="constantsTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="parameterTypeTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="parameterTypeTitle" />
        </h1>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(ParameterTypeList);
