import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import AccountList from './../components/AccountList';

// Import Actions
import * as AccountAction from './../actions/AccountAction';

// Import Selectors
import {
  getAccountListData,
  getAccountIsLoading,
  getAccountIsRequestError,
  getAccountIsDeleted,
} from './../reducers/AccountReducer';

class AccountListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(AccountAction.getAccounts(this.state.page));
  }
  onChangePage = (page) => {
    this.props.dispatch(AccountAction.getAccounts(page));
  };
  onDelete = (object) => {
    this.props.dispatch(AccountAction.deleteAccount(object));
  };
  render() {
    return (
      <AccountList
        data={this.props.data}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
        onChangePage={this.onChangePage}
        onDelete={this.onDelete}
      />
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    data: getAccountListData(state),
    isLoading: getAccountIsLoading(state),
    isRequestError: getAccountIsRequestError(state),
    isDeleted: getAccountIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(AccountListPage));
