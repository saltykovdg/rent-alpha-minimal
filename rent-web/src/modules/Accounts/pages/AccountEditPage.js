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
  emptyParameter,
  emptyService,
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
  initFormParameter = (visible, parameter = emptyParameter) => {
    this.setState({
      formParameterEditVisible: visible, parameter: ObjectUtil.cloneObject(parameter),
    });
  }
  initFormService = (visible, service = emptyService) => {
    this.setState({
      formServiceEditVisible: visible, service: ObjectUtil.cloneObject(service),
    });
  }
  onSave = (object) => {
    const newObject = ObjectUtil.cloneObject(object);
    newObject.parameters = this.props.data.parameters;
    newObject.services = this.props.data.services;
    newObject.owners = this.props.data.owners;
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
  showFormParameterEdit = (parameter = emptyParameter) => {
    this.initFormParameter(true, parameter);
  };
  onOkFormParameterEdit = (parameter = emptyParameter) => {
    this.initFormParameter(false);
    if (parameter.id) {
      this.props.dispatch(AccountAction.editParameterInAccount(ObjectUtil.cloneObject(parameter)));
    } else {
      const newParam = ObjectUtil.cloneObject(parameter);
      newParam.id = moment().unix();
      this.props.dispatch(AccountAction.addNewParameterToAccount(newParam));
    }
  }
  onCancelFormParameterEdit = () => {
    this.initFormParameter(false);
  }
  onDeleteParameter = (parameter) => {
    this.props.dispatch(AccountAction.removeParameterFromAccount(ObjectUtil.cloneObject(parameter)));
    this.forceUpdate();
  }
  showFormServiceEdit = (accountService = emptyService) => {
    this.initFormService(true, accountService);
    if (accountService && accountService.service) {
      this.onServiceChange(accountService.service.id);
    } else {
      this.onServiceChange();
    }
  };
  onOkFormServiceEdit = (service = emptyService) => {
    this.initFormService(false);
    if (service.id) {
      this.props.dispatch(AccountAction.editServiceInAccount(ObjectUtil.cloneObject(service)));
    } else {
      const newService = ObjectUtil.cloneObject(service);
      newService.id = moment().unix();
      this.props.dispatch(AccountAction.addNewServiceToAccount(newService));
    }
  }
  onCancelFormServiceEdit = () => {
    this.initFormService(false);
  }
  onDeleteService = (service) => {
    this.props.dispatch(AccountAction.removeServiceFromAccount(ObjectUtil.cloneObject(service)));
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
          id={this.state.parameter.id}
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
