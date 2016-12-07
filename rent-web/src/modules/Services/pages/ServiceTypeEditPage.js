import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import ServiceTypeEdit from './../components/ServiceTypeEdit';

// Import Actions
import * as ServiceTypeAction from './../actions/ServiceTypeAction';

// Import Selectors
import {
  getServiceTypeEditData,
  getServiceTypeIsLoading,
  getServiceTypeIsRequestError,
  getServiceTypeIsSaved,
} from './../reducers/ServiceTypeReducer';

class ServiceTypeEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(ServiceTypeAction.getServiceType(id));
    } else {
      this.props.dispatch(ServiceTypeAction.newServiceType());
    }
  }
  onSave = (object) => {
    this.props.dispatch(ServiceTypeAction.saveServiceType(object));
  };
  render() {
    return (
      <ServiceTypeEdit
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
    data: getServiceTypeEditData(state),
    isLoading: getServiceTypeIsLoading(state),
    isRequestError: getServiceTypeIsRequestError(state),
    isSaved: getServiceTypeIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(ServiceTypeEditPage));
