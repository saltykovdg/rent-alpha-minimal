import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

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
  getSystemPropertyIsRequestError,
} from './../reducers/SystemPropertyReducer';

class CalculationPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    this.initFormCalculation(false);
    this.getSystemProperties();
  }
  getSystemProperties = () => {
    this.props.dispatch(SystemPropertyAction.findSystemPropertiesByName());
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
    isRequestError: getIsRequestError(state) || getSystemPropertyIsRequestError(state),
  };
}

export default connect(mapStateToProps)(injectIntl(CalculationPage));
