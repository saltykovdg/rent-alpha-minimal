import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import AccountEdit from './../components/AccountEdit';
import AccountEditParameterForm from './../components/AccountEditParameterForm';

// Import Actions
import * as AccountAction from './../actions/AccountAction';
import * as AddressAction from './../../Address/AddressActions';

// Import Selectors
import {
  getAccountEditData,
  getAccountIsLoading,
  getAccountIsRequestError,
  getAccountIsSaved,
} from './../reducers/AccountReducer';

import {
  getStreetListData,
  getBuildingListData,
  getApartmentListData,
  getIsLoading as getIsLoadingAddress,
  getIsRequestError as getIsRequestErrorAddress,
} from './../../Address/AddressReducer';

import {
  getContractorListData,
  getContractorIsLoading,
  getContractorIsRequestError,
} from './../../Organization/OrganizationReducer';

import {
  getParameterTypeListData,
  getParameterTypeIsLoading,
  getParameterTypeIsRequestError,
} from './../../Constants/reducers/ParameterTypeReducer';

const defaultInitParameter = {
  id: '',
  parameterType: {
    id: '',
    name: '',
  },
  value: 0,
  dateStart: moment(),
  dateEnd: null,
};

class AccountEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(AccountAction.getAccount(id));
    } else {
      this.props.dispatch(AccountAction.newAccount());
    }
    this.setState({
      formParameterEditVisible: false,
      parameter: defaultInitParameter,
    });
  }
  onSave = (object) => {
    this.props.dispatch(AccountAction.saveAccount(object));
  };
  onStreetChange = (streetId) => {
    this.props.dispatch(AddressAction.findBuildingsByStreetId(streetId));
  };
  onBuildingChange = (buildingId) => {
    this.props.dispatch(AddressAction.findApartmentsByBuildingId(buildingId));
  };
  showFormParameterEdit = (parameter) => {
    this.setState({ formParameterEditVisible: true, parameter });
  };
  onOkFormParameterEdit = (parameter) => {
    this.setState({ formParameterEditVisible: false, parameter });
  }
  onCancelFormParameterEdit = () => {
    this.setState({
      formParameterEditVisible: false,
      parameter: defaultInitParameter,
    });
  }
  render() {
    return (
      <div>
        <AccountEdit
          data={this.props.data}
          contractors={this.props.contractors}
          streets={this.props.streets}
          buildings={this.props.buildings}
          apartments={this.props.apartments}
          id={this.props.id}
          isLoading={this.props.isLoading}
          isRequestError={this.props.isRequestError}
          isSaved={this.props.isSaved}
          onSave={this.onSave}
          onStreetChange={this.onStreetChange}
          onBuildingChange={this.onBuildingChange}
          showFormParameterEdit={this.showFormParameterEdit}
        />
        <AccountEditParameterForm
          parameterTypes={this.props.parameterTypes}
          parameter={this.state.parameter}
          formParameterEditVisible={this.state.formParameterEditVisible}
          onSave={() => {}}
          onOkFormParameterEdit={this.onOkFormParameterEdit}
          onCancelFormParameterEdit={this.onCancelFormParameterEdit}
        />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    data: getAccountEditData(state),
    contractors: getContractorListData(state),
    streets: getStreetListData(state),
    buildings: getBuildingListData(state),
    apartments: getApartmentListData(state),
    parameterTypes: getParameterTypeListData(state),
    isLoading: getAccountIsLoading(state) || getIsLoadingAddress(state) || getContractorIsLoading(state) || getParameterTypeIsLoading(state),
    isRequestError: getAccountIsRequestError(state) || getIsRequestErrorAddress(state) || getContractorIsRequestError(state) || getParameterTypeIsRequestError(state),
    isSaved: getAccountIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(AccountEditPage));
