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
      searchFieldAccountNumber: '',
      searchFieldLastName: '',
      searchFieldStreet: '',
      searchFieldHouse: '',
      searchFieldApartment: '',
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(AccountAction.findAccounts(
      this.state.searchFieldAccountNumber,
      this.state.searchFieldLastName,
      this.state.searchFieldStreet,
      this.state.searchFieldHouse,
      this.state.searchFieldApartment,
      this.state.page,
    ));
  }
  onSearch = (accountNumber, lastName, street, house, apartment) => {
    this.setState({
      page: 0,
      searchFieldAccountNumber: accountNumber,
      searchFieldLastName: lastName,
      searchFieldStreet: street,
      searchFieldHouse: house,
      searchFieldApartment: apartment,
    });
    this.props.dispatch(AccountAction.findAccounts(accountNumber, lastName, street, house, apartment, 0));
  }
  onChangePage = (page) => {
    this.setState({ page });
    this.props.dispatch(AccountAction.findAccounts(
      this.state.searchFieldAccountNumber,
      this.state.searchFieldLastName,
      this.state.searchFieldStreet,
      this.state.searchFieldHouse,
      this.state.searchFieldApartment,
      page,
    ));
  };
  onDelete = (object) => {
    this.props.dispatch(AccountAction.deleteAccount(
      object,
      this.state.searchFieldAccountNumber,
      this.state.searchFieldLastName,
      this.state.searchFieldStreet,
      this.state.searchFieldHouse,
      this.state.searchFieldApartment,
      this.getActualPageAfterDelete(),
    ));
  };
  render() {
    if (!this.props.data) return null;
    return (
      <AccountList
        data={this.props.data}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
        isDeleted={this.props.isDeleted}
        onSearch={this.onSearch}
        onChangePage={this.onChangePage}
        onDelete={this.onDelete}
        currentWorkingPeriod={this.props.currentWorkingPeriod}
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
