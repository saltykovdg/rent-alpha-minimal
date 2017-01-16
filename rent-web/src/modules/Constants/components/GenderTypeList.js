import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button } from 'antd';

import * as GenderTypePath from './../paths/GenderTypePath';
import { ListComponent } from './../../../components/ListComponent';

class GenderTypeList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.genderTypeFieldName, 'name'),
      this.getActionColumn(GenderTypePath.GENDER_TYPE_EDIT, false),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="constantsTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="genderTypeTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="genderTypeTitle" />
        </h1>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(GenderTypeList);
