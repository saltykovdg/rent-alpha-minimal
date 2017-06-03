import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import RoleList from './../components/RoleList';

// Import Actions
import * as RoleAction from './../actions/RoleAction';

// Import Selectors
import {
  getRoleListData,
  getRoleIsLoading,
  getRoleIsRequestError,
  getRoleIsDeleted,
} from './../reducers/RoleReducer';

class RoleListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(RoleAction.getRoles(this.state.page));
  }
  onChangePage = (page) => {
    this.setState({ page });
    this.props.dispatch(RoleAction.getRoles(page));
  };
  onDelete = (object) => {
    this.props.dispatch(RoleAction.deleteRole(object, this.getActualPageAfterDelete()));
  };
  render() {
    return (
      <RoleList
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
    data: getRoleListData(state),
    isLoading: getRoleIsLoading(state),
    isRequestError: getRoleIsRequestError(state),
    isDeleted: getRoleIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(RoleListPage));
