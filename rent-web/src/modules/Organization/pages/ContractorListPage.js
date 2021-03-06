import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import ContractorList from './../components/ContractorList';

// Import Actions
import * as OrganizationAction from './../OrganizationActions';

// Import Selectors
import {
  getContractorListData,
  getContractorIsLoading,
  getContractorIsRequestError,
  getContractorIsDeleted,
} from './../OrganizationReducer';

class ContractorListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(OrganizationAction.getContractors(this.state.page));
  }
  onChangePage = (page) => {
    this.setState({ page });
    this.props.dispatch(OrganizationAction.getContractors(page));
  };
  onDelete = (object) => {
    this.props.dispatch(OrganizationAction.deleteContractor(object, this.getActualPageAfterDelete()));
  };
  render() {
    if (!this.props.data) return null;
    return (
      <ContractorList
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
    data: getContractorListData(state),
    isLoading: getContractorIsLoading(state),
    isRequestError: getContractorIsRequestError(state),
    isDeleted: getContractorIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(ContractorListPage));
