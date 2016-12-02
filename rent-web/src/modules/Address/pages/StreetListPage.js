import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import StreetList from './../components/StreetList';

// Import Actions
import * as AddressAction from './../AddressActions';

// Import Selectors
import {
  getStreetListData,
  getStreetIsLoading,
  getStreetIsRequestError,
  getStreetIsDeleted,
} from './../AddressReducer';

class StreetListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(AddressAction.getStreets(this.state.page));
  }
  onChangePage = (page) => {
    this.props.dispatch(AddressAction.getStreets(page));
  };
  onDelete = (object) => {
    this.props.dispatch(AddressAction.deleteStreet(object));
  };
  render() {
    return (
      <StreetList
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
    data: getStreetListData(state),
    isLoading: getStreetIsLoading(state),
    isRequestError: getStreetIsRequestError(state),
    isDeleted: getStreetIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(StreetListPage));
