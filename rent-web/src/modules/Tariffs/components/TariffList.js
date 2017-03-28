import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button } from 'antd';

import * as TariffPath from './../paths/TariffPath';
import { ListComponent } from './../../../components/ListComponent';

class TariffList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.tariffFieldName, 'name'),
      this.getColumn(this.props.intl.messages.serviceFieldName, 'service.name'),
      this.getActionColumn(TariffPath.TARIFF_EDIT),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="tariffsTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="tariffsTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(TariffPath.TARIFF_EDIT)}>
          <FormattedMessage id="buttonCreateTariff" />
        </Button>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(TariffList);
