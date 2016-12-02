import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import ServiceEdit from './../components/ServiceEdit';

// Import Actions
import * as ServiceAction from './../actions/ServiceAction';

// Import Selectors
import {
  getServiceEditData,
  getServiceIsLoading,
  getServiceIsRequestError,
  getServiceIsSaved,
} from './../reducers/ServiceReducer';



class ServiceEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(ServiceAction.getService(id));
    } else {
      this.props.dispatch(ServiceAction.newService());
    }
  }
  onSave = (object) => {
    this.props.dispatch(ServiceAction.saveService(object));
  };
  render() {
    return (
      <ServiceEdit
        data={this.props.data}
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
    data: getServiceEditData(state),
    streetTypes: getServiceTypeListData(state),
    isLoading: getServiceIsLoading(state),
    isRequestError: getServiceIsRequestError(state),
    isSaved: getServiceIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(ServiceEditPage));
