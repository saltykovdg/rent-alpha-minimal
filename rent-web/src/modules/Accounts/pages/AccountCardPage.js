import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

// Import Components
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';
import AccountCard from './../components/AccountCard';
import CalculationForm from './../../../components/CalculationForm';

// Import Actions
import * as AccountAction from './../actions/AccountAction';

// Import Selectors
import {
  getAccountEditData,
} from './../reducers/AccountReducer';

import {
  getIsLoading as getIsLoadingAccounts,
  getIsRequestError as getIsRequestErrorAccounts,
} from './../AccountsReducer';

import {
  getAccountCalculationListData,
  getAccountCalculationIsLoading,
  accountIsCalculating,
  accountIsCalculatingError,
} from './../reducers/AccountCalculationsReducer';

class AccountCardPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    this.props.dispatch(AccountAction.clearLocalDataAccountCalculations());
    if (id) {
      this.props.dispatch(AccountAction.getAccountCard(id, this.props.currentWorkingPeriod.id));
    }
    this.changeWorkingPeriod(this.props.currentWorkingPeriod, false);
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
    let workingPeriodId = null;
    if (this.state.selectedWorkingPeriod.id === this.props.currentWorkingPeriod.id) {
      workingPeriodId = this.props.currentWorkingPeriod.id;
    }
    this.props.dispatch(AccountAction.calculateAccount(
      this.props.id,
      object.periodStart.id,
      object.periodEnd.id,
      workingPeriodId,
    ));
  }
  onCancelFormCalculation = () => {
    this.initFormCalculation(false);
  }
  changeWorkingPeriod = (workingPeriod, getCalculations = true) => {
    this.setState({ selectedWorkingPeriod: workingPeriod });
    if (getCalculations) {
      this.props.dispatch(AccountAction.getAccountCalculations(this.props.id, workingPeriod.id));
    }
  }
  render() {
    return (
      <div>
        <AccountCard
          data={this.props.data}
          calculations={this.props.calculations}
          isLoadingAccountCalculation={this.props.isLoadingAccountCalculation}
          accountIsCalculating={this.props.accountIsCalculating}
          id={this.props.id}
          isLoading={this.props.isLoading}
          isRequestError={this.props.isRequestError}
          workingPeriods={this.props.workingPeriods}
          currentWorkingPeriod={this.props.currentWorkingPeriod}
          selectedWorkingPeriod={this.state.selectedWorkingPeriod}
          changeWorkingPeriod={this.changeWorkingPeriod}
          showFormCalculation={this.showFormCalculation}
        />
        <CalculationForm
          title={this.props.intl.messages.calculationAccountFormTitle}
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
function mapStateToProps(state, props) {
  return {
    data: getAccountEditData(state),
    isLoading: getIsLoadingAccounts(state),
    calculations: getAccountCalculationListData(state),
    isLoadingAccountCalculation: getAccountCalculationIsLoading(state),
    accountIsCalculating: accountIsCalculating(state),
    isRequestError: getIsRequestErrorAccounts(state) || accountIsCalculatingError(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(AccountCardPage));
