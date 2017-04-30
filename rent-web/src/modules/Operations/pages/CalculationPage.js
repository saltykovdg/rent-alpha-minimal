import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import Calculation from './../components/Calculation';
import CalculationForm from './../../../components/CalculationForm';

// Import Actions
import * as CalculationAction from './../actions/CalculationAction';

// Import Selectors
import {
  getIsLoading,
  getIsRequestError,
} from './../OperationsReducer';

class CalculationEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    this.initFormCalculation(false);
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
  render() {
    return (
      <div>
        <Calculation
          showFormCalculation={this.showFormCalculation}
          isLoading={this.props.isLoading}
          isRequestError={this.props.isRequestError}
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
    isLoading: getIsLoading(state),
    isRequestError: getIsRequestError(state),
  };
}

export default connect(mapStateToProps)(injectIntl(CalculationEditPage));
