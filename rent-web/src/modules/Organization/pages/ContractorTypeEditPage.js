import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import ContractorTypeEdit from './../components/ContractorTypeEdit';

// Import Actions
import * as OrganizationAction from './../OrganizationActions';

// Import Selectors
import {
  getContractorTypeEditData,
  getContractorTypeIsLoading,
  getContractorTypeIsRequestError,
  getContractorTypeIsSaved,
} from './../OrganizationReducer';

class ContractorTypeEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(OrganizationAction.getContractorType(id));
    } else {
      this.props.dispatch(OrganizationAction.newContractorType());
    }
  }
  onSave = (object) => {
    this.props.dispatch(OrganizationAction.saveContractorType(object));
  };
  render() {
    return (
      <ContractorTypeEdit
        data={this.props.data}
        id={this.props.id}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
        isSaved={this.props.isSaved}
        onSave={this.onSave}
      />
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    data: getContractorTypeEditData(state),
    isLoading: getContractorTypeIsLoading(state),
    isRequestError: getContractorTypeIsRequestError(state),
    isSaved: getContractorTypeIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(ContractorTypeEditPage));
