import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import AccountEdit from './../components/AccountEdit';
import AccountEditParameterForm from './../components/AccountEditParameterForm';
import AccountEditServiceForm from './../components/AccountEditServiceForm';
import AccountEditOwnerForm from './../components/AccountEditOwnerForm';
import AccountEditRegisteredForm from './../components/AccountEditRegisteredForm';

// Import Actions
import * as AccountAction from './../actions/AccountAction';
import * as AddressAction from './../../Address/AddressActions';
import * as TariffAction from './../../Tariffs/actions/TariffAction';
import * as CitizenAction from './../../Citizens/actions/CitizenAction';

// Import Selectors
import {
  getAccountEditData,
  getAccountIsSaved,
  emptyParameter,
  emptyService,
  emptyOwner,
  emptyRegistered,
  emptyDocumentAttachment,
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

import {
  getDocumentTypeListData,
  getDocumentTypeIsLoading,
  getDocumentTypeIsRequestError,
} from './../../Constants/reducers/DocumentTypeReducer';

import {
  getRegistrationTypeListData,
  getRegistrationTypeIsLoading,
  getRegistrationTypeIsRequestError,
} from './../../Constants/reducers/RegistrationTypeReducer';

import {
  getCitizenListData,
  getCitizenIsLoading,
  getCitizenIsRequestError,
} from './../../Citizens/reducers/CitizenReducer';

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
    this.props.dispatch(CitizenAction.clearLocalDataCitizens());
    this.initFormParameter(false);
    this.initFormService(false);
    this.initFormOwner(false);
    this.initFormRegistered(false);
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
  initFormOwner = (visible, owner = emptyOwner) => {
    this.setState({
      formOwnerEditVisible: visible, owner: ObjectUtil.cloneObject(owner),
    });
  }
  initFormRegistered = (visible, registered = emptyRegistered) => {
    this.setState({
      formRegisteredEditVisible: visible, registered: ObjectUtil.cloneObject(registered),
    });
  }
  onSave = (object) => {
    const newObject = ObjectUtil.cloneObject(object);
    newObject.parameters = this.props.data.parameters;
    newObject.services = this.props.data.services;
    newObject.owners = this.props.data.owners;
    newObject.registered = this.props.data.registered;
    this.props.dispatch(AccountAction.saveAccount(newObject));
  }
  onStreetChange = (streetId) => {
    this.props.dispatch(AddressAction.findBuildingsByStreetId(streetId));
  }
  onBuildingChange = (buildingId) => {
    this.props.dispatch(AddressAction.findApartmentsByBuildingId(buildingId));
  }
  onServiceChange = (serviceId = '') => {
    this.props.dispatch(TariffAction.findTariffsByServiceId(serviceId));
  }
  showFormParameterEdit = (parameter = emptyParameter) => {
    this.initFormParameter(true, parameter);
  }
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
  }
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
  showFormOwnerEdit = (owner = emptyOwner) => {
    this.initFormOwner(true, owner);
  }
  onOkFormOwnerEdit = (owner = emptyOwner) => {
    this.initFormOwner(false);
    if (owner.id) {
      this.props.dispatch(AccountAction.editOwnerInAccount(ObjectUtil.cloneObject(owner)));
    } else {
      const newOwner = ObjectUtil.cloneObject(owner);
      newOwner.id = moment().unix();
      this.props.dispatch(AccountAction.addNewOwnerToAccount(newOwner));
    }
    this.props.dispatch(CitizenAction.clearLocalDataCitizens());
  }
  onCancelFormOwnerEdit = () => {
    this.initFormOwner(false);
    this.props.dispatch(CitizenAction.clearLocalDataCitizens());
  }
  onDeleteOwner = (owner) => {
    this.props.dispatch(AccountAction.removeOwnerFromAccount(ObjectUtil.cloneObject(owner)));
    this.forceUpdate();
  }
  onAddOwnerDocumentAttachment = (owner, file, attachment = emptyDocumentAttachment) => {
    const newAttachment = ObjectUtil.cloneObject(attachment);
    newAttachment.id = moment().unix();
    newAttachment.file = file;
    newAttachment.name = file.name.replace(/\.[^/.]+$/, '');
    this.props.dispatch(AccountAction.addNewAttachmentToOwner(owner, newAttachment));
    this.forceUpdate();
  }
  onDeleteOwnerDocumentAttachment = (owner, attachment) => {
    this.props.dispatch(AccountAction.removeAttachmentFromOwner(owner, attachment));
    this.forceUpdate();
  }
  showFormRegisteredEdit = (registered = emptyRegistered) => {
    this.initFormRegistered(true, registered);
  }
  onOkFormRegisteredEdit = (registered = emptyRegistered) => {
    this.initFormRegistered(false);
    if (registered.id) {
      this.props.dispatch(AccountAction.editRegisteredInAccount(ObjectUtil.cloneObject(registered)));
    } else {
      const newRegistered = ObjectUtil.cloneObject(registered);
      newRegistered.id = moment().unix();
      this.props.dispatch(AccountAction.addNewRegisteredToAccount(newRegistered));
    }
    this.props.dispatch(CitizenAction.clearLocalDataCitizens());
  }
  onCancelFormRegisteredEdit = () => {
    this.initFormRegistered(false);
    this.props.dispatch(CitizenAction.clearLocalDataCitizens());
  }
  onDeleteRegistered = (registered) => {
    this.props.dispatch(AccountAction.removeRegisteredFromAccount(ObjectUtil.cloneObject(registered)));
    this.forceUpdate();
  }
  onAddRegisteredDocumentAttachment = (registered, file, attachment = emptyDocumentAttachment) => {
    const newAttachment = ObjectUtil.cloneObject(attachment);
    newAttachment.id = moment().unix();
    newAttachment.file = file;
    newAttachment.name = file.name.replace(/\.[^/.]+$/, '');
    this.props.dispatch(AccountAction.addNewAttachmentToRegistered(registered, newAttachment));
    this.forceUpdate();
  }
  onDeleteRegisteredDocumentAttachment = (registered, attachment) => {
    this.props.dispatch(AccountAction.removeAttachmentFromRegistered(registered, attachment));
    this.forceUpdate();
  }
  onSearchCitizen = (firstName, lastName, fatherName, documentSeries, documentNumber, page, size) => {
    this.props.dispatch(CitizenAction.findCitizens(firstName, lastName, fatherName, documentSeries, documentNumber, page, size));
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
          showFormOwnerEdit={this.showFormOwnerEdit}
          onDeleteOwner={this.onDeleteOwner}
          showFormRegisteredEdit={this.showFormRegisteredEdit}
          onDeleteRegistered={this.onDeleteRegistered}
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
        <AccountEditOwnerForm
          isLoading={this.props.isLoadingCitizen}
          owner={this.state.owner}
          citizens={this.props.citizens}
          documentTypes={this.props.documentTypes}
          formOwnerEditVisible={this.state.formOwnerEditVisible}
          onOkFormOwnerEdit={this.onOkFormOwnerEdit}
          onCancelFormOwnerEdit={this.onCancelFormOwnerEdit}
          onAddOwnerDocumentAttachment={this.onAddOwnerDocumentAttachment}
          onDeleteOwnerDocumentAttachment={this.onDeleteOwnerDocumentAttachment}
          onSearchOwner={this.onSearchCitizen}
        />
        <AccountEditRegisteredForm
          isLoading={this.props.isLoadingCitizen}
          registered={this.state.registered}
          citizens={this.props.citizens}
          registrationTypes={this.props.registrationTypes}
          formRegisteredEditVisible={this.state.formRegisteredEditVisible}
          onOkFormRegisteredEdit={this.onOkFormRegisteredEdit}
          onCancelFormRegisteredEdit={this.onCancelFormRegisteredEdit}
          onAddRegisteredDocumentAttachment={this.onAddRegisteredDocumentAttachment}
          onDeleteRegisteredDocumentAttachment={this.onDeleteRegisteredDocumentAttachment}
          onSearchRegistered={this.onSearchCitizen}
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
    documentTypes: getDocumentTypeListData(state),
    registrationTypes: getRegistrationTypeListData(state),
    citizens: getCitizenListData(state),
    isLoading: getIsLoadingAccounts(state) || getIsLoadingAddress(state) ||
               getContractorIsLoading(state) || getParameterTypeIsLoading(state) ||
               getServiceIsLoading(state) || getDocumentTypeIsLoading(state) ||
               getRegistrationTypeIsLoading(state),
    isLoadingTariff: getTariffIsLoading(state),
    isLoadingCitizen: getCitizenIsLoading(state),
    isRequestError: getIsRequestErrorAccounts(state) || getIsRequestErrorAddress(state) ||
                    getContractorIsRequestError(state) || getParameterTypeIsRequestError(state) ||
                    getServiceIsRequestError(state) || getTariffIsRequestError(state) ||
                    getDocumentTypeIsRequestError(state) || getCitizenIsRequestError(state) ||
                    getRegistrationTypeIsRequestError(state),
    isSaved: getAccountIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(AccountEditPage));
