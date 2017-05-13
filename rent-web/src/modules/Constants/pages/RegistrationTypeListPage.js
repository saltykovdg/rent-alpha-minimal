import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import RegistrationTypeList from './../components/RegistrationTypeList';

// Import Actions
import * as RegistrationTypeAction from './../actions/RegistrationTypeAction';

// Import Selectors
import {
  getRegistrationTypeListData,
  getRegistrationTypeIsLoading,
  getRegistrationTypeIsRequestError,
  getRegistrationTypeIsDeleted,
} from './../reducers/RegistrationTypeReducer';

class RegistrationTypeListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(RegistrationTypeAction.getRegistrationTypes(this.state.page));
  }
  onChangePage = (page) => {
    this.setState({ page });
    this.props.dispatch(RegistrationTypeAction.getRegistrationTypes(page));
  };
  onDelete = (object) => {
    this.props.dispatch(RegistrationTypeAction.deleteRegistrationType(object, this.getActualPageAfterDelete()));
  };
  render() {
    if (!this.props.data) return null;
    return (
      <RegistrationTypeList
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
    data: getRegistrationTypeListData(state),
    isLoading: getRegistrationTypeIsLoading(state),
    isRequestError: getRegistrationTypeIsRequestError(state),
    isDeleted: getRegistrationTypeIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(RegistrationTypeListPage));
