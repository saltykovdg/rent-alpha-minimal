import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import AccountEdit from './../components/AccountEdit';

// Import Actions
import * as AccountAction from './../actions/AccountAction';

// Import Selectors
import {
  getAccountEditData,
  getAccountIsLoading,
  getAccountIsRequestError,
  getAccountIsSaved,
} from './../reducers/AccountReducer';

class AccountEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(AccountAction.getAccount(id));
    } else {
      this.props.dispatch(AccountAction.newAccount());
    }
  }
  onSave = (object) => {
    this.props.dispatch(AccountAction.saveAccount(object));
  };
  render() {
    return (
      <AccountEdit
        data={this.props.data}
        id={this.props.id}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
        onSave={this.onSave}
      />
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    data: getAccountEditData(state),
    isLoading: getAccountIsLoading(state),
    isRequestError: getAccountIsRequestError(state),
    isSaved: getAccountIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(AccountEditPage));
