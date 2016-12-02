import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import BuildingTypeLivabilityList from './../components/BuildingTypeLivabilityList';

// Import Actions
import * as AddressAction from './../AddressActions';

// Import Selectors
import {
  getBuildingTypeLivabilityListData,
  getBuildingTypeLivabilityIsLoading,
  getBuildingTypeLivabilityIsRequestError,
  getBuildingTypeLivabilityIsDeleted,
} from './../AddressReducer';

class BuildingTypeLivabilityListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(AddressAction.getBuildingTypesLivability(this.state.page));
  }
  onChangePage = (page) => {
    this.props.dispatch(AddressAction.getBuildingTypesLivability(page));
  };
  onDelete = (object) => {
    this.props.dispatch(AddressAction.deleteBuildingTypeLivability(object));
  };
  render() {
    return (
      <BuildingTypeLivabilityList
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
    data: getBuildingTypeLivabilityListData(state),
    isLoading: getBuildingTypeLivabilityIsLoading(state),
    isRequestError: getBuildingTypeLivabilityIsRequestError(state),
    isDeleted: getBuildingTypeLivabilityIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(BuildingTypeLivabilityListPage));
