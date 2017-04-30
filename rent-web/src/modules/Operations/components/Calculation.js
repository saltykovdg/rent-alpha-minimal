import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Spin } from 'antd';

import { EditComponent } from './../../../components/EditComponent';

class Calculation extends EditComponent {
  render() {
    const titleItem = <FormattedMessage id="calculationTitle" />;
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="operationsTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item>{titleItem}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{titleItem}</h1>
        <Spin spinning={this.props.isLoading}>
          <h2><FormattedMessage id="calculationWorkingPeriodTitle" /></h2>
          <Button label={' '} onClick={() => this.props.showFormCalculation()}>
            <FormattedMessage id="buttonExecuteCalculations" />
          </Button>
          <h2><FormattedMessage id="closeWorkingPeriodTitle" /></h2>
          <Button type="danger" onClick={() => null}>
            <FormattedMessage id="buttonGotoNewWorkingPeriod" />
          </Button>
        </Spin>
      </div>
    );
  }
}

export default injectIntl(Calculation);
