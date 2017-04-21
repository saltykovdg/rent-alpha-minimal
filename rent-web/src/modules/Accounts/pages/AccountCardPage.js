import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import AccountCard from './../components/AccountCard';

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
} from './../reducers/AccountCalculationsReducer';

class AccountCardPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(AccountAction.getAccountCard(id));
    }
    this.changeWorkingPeriod(null);
  }
  componentWillUpdate(nextProps) {
    if (!this.state.selectedWorkingPeriod && nextProps.currentWorkingPeriod.id) {
      this.setState({ selectedWorkingPeriod: nextProps.currentWorkingPeriod });
    }
    const accountId = nextProps.data.id;
    const workingPeriodId = nextProps.currentWorkingPeriod.id;
    if (!nextProps.calculations && accountId && workingPeriodId) {
      this.props.dispatch(AccountAction.getAccountCalculations(accountId, workingPeriodId));
    }
  }
  changeWorkingPeriod = (workingPeriod) => {
    this.setState({ selectedWorkingPeriod: workingPeriod });
    if (workingPeriod) {
      this.props.dispatch(AccountAction.getAccountCalculations(this.props.id, workingPeriod.id));
    }
  }
  render() {
    return (
      <AccountCard
        data={this.props.data}
        calculations={this.props.calculations}
        isLoadingAccountCalculation={this.props.isLoadingAccountCalculation}
        id={this.props.id}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
        workingPeriods={this.props.workingPeriods}
        currentWorkingPeriod={this.props.currentWorkingPeriod}
        selectedWorkingPeriod={this.state.selectedWorkingPeriod}
        changeWorkingPeriod={this.changeWorkingPeriod}
      />
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
    isRequestError: getIsRequestErrorAccounts(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(AccountCardPage));
