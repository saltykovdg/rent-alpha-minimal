import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import BuildingMaterialList from './../components/BuildingMaterialList';

// Import Actions
import * as AddressAction from './../AddressActions';

// Import Selectors
import {
  getBuildingMaterialListData,
  getBuildingMaterialIsLoading,
  getBuildingMaterialIsRequestError,
  getBuildingMaterialIsDeleted,
} from './../AddressReducer';

class BuildingMaterialListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(AddressAction.getBuildingMaterials(this.state.page));
  }
  onChangePage = (page) => {
    this.props.dispatch(AddressAction.getBuildingMaterials(page));
  };
  onDelete = (object) => {
    this.props.dispatch(AddressAction.deleteBuildingMaterial(object));
  };
  render() {
    return (
      <BuildingMaterialList
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
    data: getBuildingMaterialListData(state),
    isLoading: getBuildingMaterialIsLoading(state),
    isRequestError: getBuildingMaterialIsRequestError(state),
    isDeleted: getBuildingMaterialIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(BuildingMaterialListPage));
