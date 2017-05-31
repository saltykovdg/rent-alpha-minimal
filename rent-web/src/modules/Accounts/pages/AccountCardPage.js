import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

// Import Components
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';
import AccountCard from './../components/AccountCard';
import AccountAddPaymentForm from './../components/AccountAddPaymentForm';
import AccountAddRecalculationForm from './../components/AccountAddRecalculationForm';
import CalculationForm from './../../../components/CalculationForm';
import ReportForm from './../../../components/ReportForm';

// Import Actions
import * as AccountAction from './../actions/AccountAction';
import * as AccountPaymentAction from './../actions/AccountPaymentAction';
import * as AccountRecalculationAction from './../actions/AccountRecalculationAction';

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

import {
  getAccountRecalculationListData,
  getAccountRecalculationIsLoadingEdit,
  getAccountRecalculationIsLoadingList,
} from './../reducers/AccountRecalculationReducer';

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
    this.initFormReport(false);
    this.initFormAddPayment(false);
    this.initFormAddRecalculation(false);
  }
  initFormCalculation = (visible) => {
    this.setState({ formCalculationVisible: visible });
  }
  initFormReport = (visible) => {
    this.setState({ formReportVisible: visible });
  }
  initFormAddPayment = (visible) => {
    this.setState({ formAddPaymentVisible: visible });
  }
  initFormAddRecalculation = (visible) => {
    this.setState({ formAddRecalculationVisible: visible });
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
  showFormReport = () => {
    this.initFormReport(true);
  }
  onOkFormReport = (object) => {
    this.initFormReport(false);
    this.props.dispatch(AccountAction.downloadAccountReportUPD(
      this.props.id,
      object.periodStart.id,
      object.periodEnd.id
    ));
  }
  onCancelFormReport = () => {
    this.initFormReport(false);
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
      payment.bundleId,
      this.isCurrentWorkingPeriod()
    ));
  }
  showFormAddRecalculation = () => {
    this.initFormAddRecalculation(true);
  }
  onOkFormAddRecalculation = (accountServiceId, sum, note) => {
    this.initFormAddRecalculation(false);
    this.props.dispatch(AccountRecalculationAction.addAccountRecalculation(
      this.props.id,
      accountServiceId,
      sum,
      note,
      this.isCurrentWorkingPeriod())
    );
  }
  onCancelFormAddRecalculation = () => {
    this.initFormAddRecalculation(false);
  }
  onChangeAccountRecalculationPage = (page) => {
    this.props.dispatch(AccountRecalculationAction.getAccountRecalculations(this.props.id, page));
  };
  onDeleteAccountRecalculation = (recalculation) => {
    this.props.dispatch(AccountRecalculationAction.deleteAccountRecalculation(
      this.props.id,
      recalculation.bundleId,
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
          id={this.props.id}
          data={this.props.data}
          calculations={this.props.calculations}
          isLoadingAccountCalculation={this.props.isLoadingAccountCalculation}
          accountIsCalculating={this.props.accountIsCalculating}
          payments={this.props.payments}
          isLoadingAccountPayments={this.props.isLoadingAccountPayments}
          isLoadingAddAccountPayment={this.props.isLoadingAddAccountPayment}
          onChangeAccountPaymentPage={this.onChangeAccountPaymentPage}
          recalculations={this.props.recalculations}
          isLoadingAccountRecalculations={this.props.isLoadingAccountRecalculations}
          isLoadingAddAccountRecalculation={this.props.isLoadingAddAccountRecalculation}
          onChangeAccountRecalculationPage={this.onChangeAccountRecalculationPage}
          isLoading={this.props.isLoading}
          isRequestError={this.props.isRequestError}
          workingPeriods={this.props.workingPeriods}
          currentWorkingPeriod={this.props.currentWorkingPeriod}
          selectedWorkingPeriod={this.state.selectedWorkingPeriod}
          changeWorkingPeriod={this.changeWorkingPeriod}
          showFormCalculation={this.showFormCalculation}
          showFormReport={this.showFormReport}
          onDeleteAccountPayment={this.onDeleteAccountPayment}
          showFormAddPayment={this.showFormAddPayment}
          onDeleteAccountRecalculation={this.onDeleteAccountRecalculation}
          showFormAddRecalculation={this.showFormAddRecalculation}
        />
        <CalculationForm
          title={this.props.intl.messages.calculationAccountFormTitle}
          formCalculationVisible={this.state.formCalculationVisible}
          workingPeriods={this.props.workingPeriods}
          currentWorkingPeriod={this.props.currentWorkingPeriod}
          onOkFormCalculation={this.onOkFormCalculation}
          onCancelFormCalculation={this.onCancelFormCalculation}
        />
        <ReportForm
          accountId={this.props.id}
          title={this.props.intl.messages.reportAccountFormTitle}
          formReportVisible={this.state.formReportVisible}
          workingPeriods={this.props.workingPeriods}
          currentWorkingPeriod={this.props.currentWorkingPeriod}
          onOkFormReport={this.onOkFormReport}
          onCancelFormReport={this.onCancelFormReport}
        />
        <AccountAddPaymentForm
          formAddPaymentVisible={this.state.formAddPaymentVisible}
          onOkFormAddPayment={this.onOkFormAddPayment}
          onCancelFormAddPayment={this.onCancelFormAddPayment}
        />
        <AccountAddRecalculationForm
          data={this.props.data}
          formAddRecalculationVisible={this.state.formAddRecalculationVisible}
          onOkFormAddRecalculation={this.onOkFormAddRecalculation}
          onCancelFormAddRecalculation={this.onCancelFormAddRecalculation}
          currentWorkingPeriod={this.props.currentWorkingPeriod}
        />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    id: props.params.id,
    data: getAccountEditData(state),
    isLoading: getIsLoadingAccounts(state),
    calculations: getAccountCalculationListData(state),
    isLoadingAccountCalculation: getAccountCalculationIsLoading(state),
    payments: getAccountPaymentListData(state),
    isLoadingAccountPayments: getAccountPaymentIsLoadingList(state),
    isLoadingAddAccountPayment: getAccountPaymentIsLoadingEdit(state),
    recalculations: getAccountRecalculationListData(state),
    isLoadingAccountRecalculations: getAccountRecalculationIsLoadingList(state),
    isLoadingAddAccountRecalculation: getAccountRecalculationIsLoadingEdit(state),
    accountIsCalculating: accountIsCalculating(state),
    isRequestError: getIsRequestErrorAccounts(state) || accountIsCalculatingError(state),
  };
}

export default connect(mapStateToProps)(injectIntl(AccountCardPage));
