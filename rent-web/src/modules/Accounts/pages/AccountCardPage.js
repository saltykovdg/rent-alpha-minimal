import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

// Import Components
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';
import AccountCard from './../components/AccountCard';
import AccountAddPaymentForm from './../components/AccountAddPaymentForm';
import CalculationForm from './../../../components/CalculationForm';

// Import Actions
import * as AccountAction from './../actions/AccountAction';
import * as AccountPaymentAction from './../actions/AccountPaymentAction';

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

import {
  getAccountPaymentListData,
  getAccountPaymentIsLoadingEdit,
  getAccountPaymentIsLoadingList,
} from './../reducers/AccountPaymentReducer';

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
    this.initFormAddPayment(false);
  }
  initFormCalculation = (visible) => {
    this.setState({ formCalculationVisible: visible });
  }
  initFormAddPayment = (visible) => {
    this.setState({ formAddPaymentVisible: visible });
  }
  showFormCalculation = () => {
    this.initFormCalculation(true);
  }
  onOkFormCalculation = (object) => {
    this.initFormCalculation(false);
    this.props.dispatch(AccountAction.calculateAccount(
      this.props.id,
      object.periodStart.id,
      object.periodEnd.id,
      this.isCurrentWorkingPeriod(),
    ));
  }
  onCancelFormCalculation = () => {
    this.initFormCalculation(false);
  }
  showFormAddPayment = () => {
    this.initFormAddPayment(true);
  }
  onOkFormAddPayment = (sum) => {
    this.initFormAddPayment(false);
    this.props.dispatch(AccountPaymentAction.addAccountPayment(this.props.id, sum, this.isCurrentWorkingPeriod()));
  }
  onCancelFormAddPayment = () => {
    this.initFormAddPayment(false);
  }
  changeWorkingPeriod = (workingPeriod, getCalculations = true) => {
    this.setState({ selectedWorkingPeriod: workingPeriod });
    if (getCalculations) {
      this.props.dispatch(AccountAction.getAccountCalculations(this.props.id, workingPeriod.id));
    }
  }
  onChangeAccountPaymentPage = (page) => {
    this.props.dispatch(AccountPaymentAction.getAccountPayments(this.props.id, page));
  };
  onDeleteAccountPayment = (payment) => {
    this.props.dispatch(AccountPaymentAction.deleteAccountPayment(
      this.props.id,
      payment.paymentBundleId,
      this.isCurrentWorkingPeriod()
    ));
  }
  isCurrentWorkingPeriod = () => {
    let workingPeriodId = null;
    if (this.state.selectedWorkingPeriod.id === this.props.currentWorkingPeriod.id) {
      workingPeriodId = this.props.currentWorkingPeriod.id;
    }
    return workingPeriodId;
  }
  render() {
    if (!this.props.data) return null;
    return (
      <div>
        <AccountCard
          data={this.props.data}
          calculations={this.props.calculations}
          isLoadingAccountCalculation={this.props.isLoadingAccountCalculation}
          accountIsCalculating={this.props.accountIsCalculating}
          payments={this.props.payments}
          isLoadingAccountPayments={this.props.isLoadingAccountPayments}
          isLoadingAddAccountPayment={this.props.isLoadingAddAccountPayment}
          onChangeAccountPaymentPage={this.onChangeAccountPaymentPage}
          id={this.props.id}
          isLoading={this.props.isLoading}
          isRequestError={this.props.isRequestError}
          workingPeriods={this.props.workingPeriods}
          currentWorkingPeriod={this.props.currentWorkingPeriod}
          selectedWorkingPeriod={this.state.selectedWorkingPeriod}
          changeWorkingPeriod={this.changeWorkingPeriod}
          showFormCalculation={this.showFormCalculation}
          onDeleteAccountPayment={this.onDeleteAccountPayment}
          showFormAddPayment={this.showFormAddPayment}
        />
        <CalculationForm
          title={this.props.intl.messages.calculationAccountFormTitle}
          formCalculationVisible={this.state.formCalculationVisible}
          workingPeriods={this.props.workingPeriods}
          currentWorkingPeriod={this.props.currentWorkingPeriod}
          onOkFormCalculation={this.onOkFormCalculation}
          onCancelFormCalculation={this.onCancelFormCalculation}
        />
        <AccountAddPaymentForm
          formAddPaymentVisible={this.state.formAddPaymentVisible}
          onOkFormAddPayment={this.onOkFormAddPayment}
          onCancelFormAddPayment={this.onCancelFormAddPayment}
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
    payments: getAccountPaymentListData(state),
    isLoadingAccountPayments: getAccountPaymentIsLoadingList(state),
    isLoadingAddAccountPayment: getAccountPaymentIsLoadingEdit(state),
    accountIsCalculating: accountIsCalculating(state),
    isRequestError: getIsRequestErrorAccounts(state) || accountIsCalculatingError(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(AccountCardPage));
