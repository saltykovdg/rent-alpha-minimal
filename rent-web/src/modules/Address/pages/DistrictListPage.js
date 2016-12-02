import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import DistrictList from './../components/DistrictList';

// Import Actions
import * as AddressAction from './../AddressActions';

// Import Selectors
import {
  getDistrictListData,
  getDistrictIsLoading,
  getDistrictIsRequestError,
  getDistrictIsDeleted,
} from './../AddressReducer';

class DistrictListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(AddressAction.getDistricts(this.state.page));
  }
  onChangePage = (page) => {
    this.props.dispatch(AddressAction.getDistricts(page));
  };
  onDelete = (object) => {
    this.props.dispatch(AddressAction.deleteDistrict(object));
  };
  render() {
    return (
      <DistrictList
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
    data: getDistrictListData(state),
    isLoading: getDistrictIsLoading(state),
    isRequestError: getDistrictIsRequestError(state),
    isDeleted: getDistrictIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(DistrictListPage));
