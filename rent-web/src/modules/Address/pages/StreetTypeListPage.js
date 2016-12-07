import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import StreetTypeList from './../components/StreetTypeList';

// Import Actions
import * as AddressAction from './../AddressActions';

// Import Selectors
import {
  getStreetTypeListData,
  getStreetTypeIsLoading,
  getStreetTypeIsRequestError,
  getStreetTypeIsDeleted,
} from './../AddressReducer';

class StreetTypeListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(AddressAction.getStreetTypes(this.state.page));
  }
  onChangePage = (page) => {
    this.props.dispatch(AddressAction.getStreetTypes(page));
  };
  onDelete = (object) => {
    this.props.dispatch(AddressAction.deleteStreetType(object));
  };
  render() {
    return (
      <StreetTypeList
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
    data: getStreetTypeListData(state),
    isLoading: getStreetTypeIsLoading(state),
    isRequestError: getStreetTypeIsRequestError(state),
    isDeleted: getStreetTypeIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(StreetTypeListPage));
