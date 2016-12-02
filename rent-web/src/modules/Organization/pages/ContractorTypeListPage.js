import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import ContractorTypeList from './../components/ContractorTypeList';

// Import Actions
import * as OrganizationAction from './../OrganizationActions';

// Import Selectors
import {
  getContractorTypeListData,
  getContractorTypeIsLoading,
  getContractorTypeIsRequestError,
  getContractorTypeIsDeleted,
} from './../OrganizationReducer';

class ContractorTypeListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(OrganizationAction.getContractorTypes(this.state.page));
  }
  onChangePage = (page) => {
    this.props.dispatch(OrganizationAction.getContractorTypes(page));
  };
  onDelete = (object) => {
    this.props.dispatch(OrganizationAction.deleteContractorType(object));
  };
  render() {
    return (
      <ContractorTypeList
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
    data: getContractorTypeListData(state),
    isLoading: getContractorTypeIsLoading(state),
    isRequestError: getContractorTypeIsRequestError(state),
    isDeleted: getContractorTypeIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(ContractorTypeListPage));
