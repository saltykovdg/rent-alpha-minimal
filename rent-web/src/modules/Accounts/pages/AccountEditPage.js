import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import AccountEdit from './../components/AccountEdit';
import AccountEditParameterForm from './../components/AccountEditParameterForm';
import AccountEditServiceForm from './../components/AccountEditServiceForm';

// Import Actions
import * as AccountAction from './../actions/AccountAction';
import * as AddressAction from './../../Address/AddressActions';
import * as TariffAction from './../../Tariffs/actions/TariffAction';

// Import Selectors
import {
  getAccountEditData,
  getAccountIsSaved,
  getDefaultParameter,
  getDefaultService,
} from './../reducers/AccountReducer';

import {
  getIsLoading as getIsLoadingAccounts,
  getIsRequestError as getIsRequestErrorAccounts,
} from './../AccountsReducer';

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

import {
  getServiceListData,
  getServiceIsLoading,
  getServiceIsRequestError,
} from './../../Services/reducers/ServiceReducer';

import {
  getTariffListData,
  getTariffIsLoading,
  getTariffIsRequestError,
} from './../..//Tariffs/reducers/TariffReducer';

import * as ObjectUtil from './../../../util/ObjectUtil';

class AccountEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(AccountAction.getAccount(id));
    } else {
      this.props.dispatch(AccountAction.newAccount());
    }
    this.initFormParameter(false);
    this.initFormService(false);
  }
  initFormParameter = (visible, parameter = getDefaultParameter()) => {
    this.setState({
      formParameterEditVisible: visible, parameter,
    });
  }
  initFormService = (visible, service = getDefaultService()) => {
    this.setState({
      formServiceEditVisible: visible, service: ObjectUtil.cloneObject(service),
    });
  }
  onSave = (object) => {
    const newObject = object;
    newObject.parameters = this.props.data.parameters;
    newObject.services = this.props.data.services;
    this.props.dispatch(AccountAction.saveAccount(newObject));
  };
  onStreetChange = (streetId) => {
    this.props.dispatch(AddressAction.findBuildingsByStreetId(streetId));
  };
  onBuildingChange = (buildingId) => {
    this.props.dispatch(AddressAction.findApartmentsByBuildingId(buildingId));
  };
  onServiceChange = (serviceId = '') => {
    this.props.dispatch(TariffAction.findTariffsByServiceId(serviceId));
  };
  showFormParameterEdit = (parameter = getDefaultParameter()) => {
    this.initFormParameter(true, parameter);
  };
  showFormServiceEdit = (accountService = getDefaultService()) => {
    this.initFormService(true, accountService);
    if (accountService && accountService.service) {
      this.onServiceChange(accountService.service.id);
    } else {
      this.onServiceChange();
    }
  };
  onOkFormParameterEdit = (parameter = getDefaultParameter()) => {
    this.initFormParameter(false);
    if (parameter.id) {
      this.props.dispatch(AccountAction.editParameterInAccount(parameter));
    } else {
      const newParam = parameter;
      newParam.id = moment().unix();
      this.props.dispatch(AccountAction.addNewParameterToAccount(newParam));
    }
  }
  onCancelFormParameterEdit = () => {
    this.initFormParameter(false);
  }
  onDeleteParameter = (parameter) => {
    this.props.dispatch(AccountAction.removeParameterFromAccount(parameter));
    this.forceUpdate();
  }
  onOkFormServiceEdit = (service = getDefaultService()) => {
    this.initFormService(false);
    if (service.id) {
      this.props.dispatch(AccountAction.editServiceInAccount(service));
    } else {
      const newService = service;
      newService.id = moment().unix();
      this.props.dispatch(AccountAction.addNewServiceToAccount(newService));
    }
  }
  onCancelFormServiceEdit = () => {
    this.initFormService(false);
  }
  onDeleteService = (service) => {
    this.props.dispatch(AccountAction.removeServiceFromAccount(service));
    this.forceUpdate();
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
          onDeleteParameter={this.onDeleteParameter}
          showFormServiceEdit={this.showFormServiceEdit}
          onDeleteService={this.onDeleteService}
        />
        <AccountEditParameterForm
          parameterTypes={this.props.parameterTypes}
          parameter={this.state.parameter}
          formParameterEditVisible={this.state.formParameterEditVisible}
          onOkFormParameterEdit={this.onOkFormParameterEdit}
          onCancelFormParameterEdit={this.onCancelFormParameterEdit}
        />
        <AccountEditServiceForm
          isLoading={this.props.isLoadingTariff}
          tariffs={this.props.tariffs}
          services={this.props.services}
          service={this.state.service}
          onServiceChange={this.onServiceChange}
          formServiceEditVisible={this.state.formServiceEditVisible}
          onOkFormServiceEdit={this.onOkFormServiceEdit}
          onCancelFormServiceEdit={this.onCancelFormServiceEdit}
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
    services: getServiceListData(state),
    tariffs: getTariffListData(state),
    isLoading: getIsLoadingAccounts(state) || getIsLoadingAddress(state) ||
               getContractorIsLoading(state) || getParameterTypeIsLoading(state) ||
               getServiceIsLoading(state),
    isLoadingTariff: getTariffIsLoading(state),
    isRequestError: getIsRequestErrorAccounts(state) || getIsRequestErrorAddress(state) ||
                    getContractorIsRequestError(state) || getParameterTypeIsRequestError(state) ||
                    getServiceIsRequestError(state) || getTariffIsRequestError(state),
    isSaved: getAccountIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(AccountEditPage));
