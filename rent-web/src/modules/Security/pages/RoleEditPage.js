import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import RoleEdit from './../components/RoleEdit';

// Import Actions
import * as RoleAction from './../actions/RoleAction';

// Import Selectors
import {
  getRoleEditData,
  getRoleIsLoading,
  getRoleIsRequestError,
  getRoleIsSaved,
} from './../reducers/RoleReducer';

class RoleEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(RoleAction.getRole(id));
    } else {
      this.props.dispatch(RoleAction.newRole());
    }
  }
  onSave = (object) => {
    this.props.dispatch(RoleAction.saveRole(object));
  };
  render() {
    return (
      <RoleEdit
        data={this.props.data}
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
    data: getRoleEditData(state),
    isLoading: getRoleIsLoading(state),
    isRequestError: getRoleIsRequestError(state),
    isSaved: getRoleIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(RoleEditPage));
