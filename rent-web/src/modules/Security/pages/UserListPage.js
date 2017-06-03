import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import UserList from './../components/UserList';

// Import Actions
import * as UserAction from './../actions/UserAction';

// Import Selectors
import {
  getUserListData,
  getUserIsLoading,
  getUserIsRequestError,
  getUserIsDeleted,
} from './../reducers/UserReducer';

class UserListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(UserAction.getUsers(this.state.page));
  }
  onChangePage = (page) => {
    this.setState({ page });
    this.props.dispatch(UserAction.getUsers(page));
  };
  onDelete = (object) => {
    this.props.dispatch(UserAction.deleteUser(object, this.getActualPageAfterDelete()));
  };
  render() {
    return (
      <UserList
        data={this.props.data}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
        isDeleted={this.props.isDeleted}
        onChangePage={this.onChangePage}
        onDelete={this.onDelete}
      />
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    data: getUserListData(state),
    isLoading: getUserIsLoading(state),
    isRequestError: getUserIsRequestError(state),
    isDeleted: getUserIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(UserListPage));
