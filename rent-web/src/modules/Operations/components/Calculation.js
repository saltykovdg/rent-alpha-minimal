import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Spin, Progress } from 'antd';

import { EditComponent } from './../../../components/EditComponent';
import * as SystemPropertyType from './../../../util/SystemPropertyType';

const ButtonGroup = Button.Group;

class Calculation extends EditComponent {
  getSystemPropertyByName = (systemProperties, name) => {
    return systemProperties.content.filter(systemProperty => systemProperty.name === name)[0];
  }
  getSystemPropertyCalculationIsActive = (systemProperties) => {
    if (!systemProperties) return false;
    const prop = this.getSystemPropertyByName(systemProperties, SystemPropertyType.CALCULATION_IS_ACTIVE);
    return prop.value === '1';
  }
  getSystemPropertyCalculationAccountsCount = (systemProperties) => {
    if (!systemProperties) return 0;
    const prop = this.getSystemPropertyByName(systemProperties, SystemPropertyType.CALCULATION_ACCOUNTS_COUNT);
    return parseInt(prop.value, 0);
  }
  getSystemPropertyCalculationAccountsCalculated = (systemProperties) => {
    if (!systemProperties) return 0;
    const prop = this.getSystemPropertyByName(systemProperties, SystemPropertyType.CALCULATION_ACCOUNTS_CALCULATED);
    return parseInt(prop.value, 0);
  }
  confirmCloseWorkingPeriod = (props) => {
    const messages = props.intl.messages;
    this.confirmModal(
      messages.confirmCloseWorkingPeriodTitle,
      messages.confirmCloseWorkingPeriodContent,
      props.onCloseWorkingPeriod,
    );
  }
  confirmRollbackCurrentWorkingPeriod = (props) => {
    const messages = props.intl.messages;
    this.confirmModal(
      messages.confirmRollbackCurrentWorkingPeriodTitle,
      messages.confirmRollbackCurrentWorkingPeriodContent,
      props.onRollbackCurrentWorkingPeriod,
    );
  }
  render() {
    const titleItem = <FormattedMessage id="calculationTitle" />;
    const systemProperties = this.props.systemProperties;
    const calculationIsActive = this.getSystemPropertyCalculationIsActive(systemProperties);
    const calculationAccountsCount = this.getSystemPropertyCalculationAccountsCount(systemProperties);
    const calculationAccountsCalculated = this.getSystemPropertyCalculationAccountsCalculated(systemProperties);
    let percentComplete = 100;
    if (calculationIsActive && calculationAccountsCount > 0) {
      percentComplete = Math.round((calculationAccountsCalculated / calculationAccountsCount) * 100);
    }
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
        {
          !calculationIsActive ?
            <div>
              <Spin spinning={this.props.isLoading}>
                <h2><FormattedMessage id="calculationWorkingPeriodTitle" /></h2>
                <Button label={' '} onClick={() => this.props.showFormCalculation()}>
                  <FormattedMessage id="buttonExecuteCalculations" />
                </Button>
                <h2><FormattedMessage id="closeWorkingPeriodTitle" /></h2>
                <ButtonGroup>
                  <Button type="danger" onClick={() => this.confirmRollbackCurrentWorkingPeriod(this.props)}>
                    <FormattedMessage id="buttonRollbackCurrentWorkingPeriod" />
                  </Button>
                  <Button type="danger" onClick={() => this.confirmCloseWorkingPeriod(this.props)}>
                    <FormattedMessage id="buttonCloseWorkingPeriod" />
                  </Button>
                </ButtonGroup>
              </Spin>
            </div> :
            <div>
              <h2><FormattedMessage id="calculationsExecuteTitle" /></h2>
              <Progress percent={percentComplete} status="active" />
            </div>
        }
      </div>
    );
  }
}

export default injectIntl(Calculation);
