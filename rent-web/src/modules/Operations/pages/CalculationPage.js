import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

import * as SystemPropertyType from './../../../util/SystemPropertyType';

// Import Components
import Calculation from './../components/Calculation';
import CalculationForm from './../../../components/CalculationForm';

// Import Actions
import * as CalculationAction from './../actions/CalculationAction';
import * as SystemPropertyAction from './../actions/SystemPropertyAction';

// Import Selectors
import {
  getIsLoading,
  getIsRequestError,
} from './../OperationsReducer';

import {
  getSystemPropertyData,
  getSystemPropertyIsLoading,
  getSystemPropertyIsRequestError,
} from './../reducers/SystemPropertyReducer';

class CalculationPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    this.initFormCalculation(false);
    this.getSystemProperties();
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.systemProperties) {
      const prop = nextProps.systemProperties.content.filter(systemProperty => systemProperty.name === SystemPropertyType.CALCULATION_IS_ACTIVE)[0];
      if (prop.value === '1' && !nextProps.isLoadingSystemProperty) {
        this.getSystemProperties(true);
      }
    }
  }
  getSystemProperties = (useDelay = false) => {
    this.props.dispatch(SystemPropertyAction.findSystemPropertiesByName('', useDelay));
  }
  initFormCalculation = (visible) => {
    this.setState({ formCalculationVisible: visible });
  }
  showFormCalculation = () => {
    this.initFormCalculation(true);
  }
  onOkFormCalculation = (object) => {
    this.initFormCalculation(false);
    this.props.dispatch(CalculationAction.calculateAccounts(
      object.periodStart.id,
      object.periodEnd.id,
    ));
  }
  onCancelFormCalculation = () => {
    this.initFormCalculation(false);
  }
  onCloseWorkingPeriod = () => {
    this.props.dispatch(CalculationAction.closeWorkingPeriod());
  }
  render() {
    return (
      !this.props.systemProperties ? null :
      <div>
        <Calculation
          showFormCalculation={this.showFormCalculation}
          onCloseWorkingPeriod={this.onCloseWorkingPeriod}
          isLoading={this.props.isLoading}
          isRequestError={this.props.isRequestError}
          systemProperties={this.props.systemProperties}
          getSystemProperties={this.getSystemProperties}
          isLoadingSystemProperty={this.isLoadingSystemProperty}
        />
        <CalculationForm
          title={this.props.intl.messages.calculationAccountsFormTitle}
          formCalculationVisible={this.state.formCalculationVisible}
          workingPeriods={this.props.workingPeriods}
          currentWorkingPeriod={this.props.currentWorkingPeriod}
          onOkFormCalculation={this.onOkFormCalculation}
          onCancelFormCalculation={this.onCancelFormCalculation}
        />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    systemProperties: getSystemPropertyData(state),
    isLoading: getIsLoading(state),
    isLoadingSystemProperty: getSystemPropertyIsLoading(state),
    isRequestError: getIsRequestError(state) || getSystemPropertyIsRequestError(state),
  };
}

export default connect(mapStateToProps)(injectIntl(CalculationPage));
