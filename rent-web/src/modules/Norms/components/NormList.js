import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button } from 'antd';

import * as NormPath from './../paths/NormPath';
import { ListComponent } from './../../../components/ListComponent';

class NormList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.normFieldName, 'name'),
      this.getColumn(this.props.intl.messages.serviceFieldName, 'service.name'),
      this.getActionColumn(NormPath.NORM_EDIT),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="normsTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="normsTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(NormPath.NORM_EDIT)}>
          <FormattedMessage id="buttonAddNewRecord" />
        </Button>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(NormList);
