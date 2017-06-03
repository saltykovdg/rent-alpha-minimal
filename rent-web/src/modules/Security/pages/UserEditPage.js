import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import UserEdit from './../components/UserEdit';

// Import Actions
import * as UserAction from './../actions/UserAction';

// Import Selectors
import {
  getUserEditData,
  getUserIsLoading,
  getUserIsRequestError,
  getUserIsSaved,
} from './../reducers/UserReducer';

import {
  getRoleListData,
  getRoleIsLoading,
  getRoleIsRequestError,
} from './../reducers/RoleReducer';

class UserEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(UserAction.getUser(id));
    } else {
      this.props.dispatch(UserAction.newUser());
    }
  }
  onSave = (object) => {
    this.props.dispatch(UserAction.saveUser(object));
  };
  render() {
    return (
      <UserEdit
        data={this.props.data}
        roles={this.props.roles}
        id={this.props.id}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
        isSaved={this.props.isSaved}
        onSave={this.onSave}
      />
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    data: getUserEditData(state),
    roles: getRoleListData(state),
    isLoading: getUserIsLoading(state) || getRoleIsLoading(state),
    isRequestError: getUserIsRequestError(state) || getRoleIsRequestError(state),
    isSaved: getUserIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(UserEditPage));
