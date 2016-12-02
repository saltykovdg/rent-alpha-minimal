import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import ContractorEdit from './../components/ContractorEdit';

// Import Actions
import * as OrganizationAction from './../OrganizationActions';

// Import Selectors
import {
  getContractorTypeListData,
  getContractorEditData,
  getIsLoading,
  getIsRequestError,
  getContractorIsSaved,
} from './../OrganizationReducer';

class ContractorEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(OrganizationAction.getContractor(id));
    } else {
      this.props.dispatch(OrganizationAction.newContractor());
    }
  }
  onSave = (object) => {
    this.props.dispatch(OrganizationAction.saveContractor(object));
  };
  render() {
    return (
      <ContractorEdit
        data={this.props.data}
        contractorTypes={this.props.contractorTypes}
        id={this.props.id}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
        onSave={this.onSave}
      />
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    data: getContractorEditData(state),
    contractorTypes: getContractorTypeListData(state),
    isLoading: getIsLoading(state),
    isRequestError: getIsRequestError(state),
    isSaved: getContractorIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(ContractorEditPage));
