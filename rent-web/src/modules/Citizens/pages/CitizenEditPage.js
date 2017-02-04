import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import moment from 'moment';

import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import CitizenEdit from './../components/CitizenEdit';
import CitizenEditDocumentForm from './../components/CitizenEditDocumentForm';

// Import Actions
import * as CitizenAction from './../actions/CitizenAction';

// Import Selectors
import {
  getCitizenEditData,
  getCitizenIsLoading,
  getCitizenIsRequestError,
  getCitizenIsSaved,
  emptyDocument,
} from './../reducers/CitizenReducer';

import {
  getGenderTypeListData,
  getGenderTypeIsLoading,
  getGenderTypeIsRequestError,
} from './../../Constants/reducers/GenderTypeReducer';

import {
  getDocumentTypeListData,
  getDocumentTypeIsLoading,
  getDocumentTypeIsRequestError,
} from './../../Constants/reducers/DocumentTypeReducer';

import * as ObjectUtil from './../../../util/ObjectUtil';

class CitizenEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(CitizenAction.getCitizen(id));
    } else {
      this.props.dispatch(CitizenAction.newCitizen());
    }
    this.initFormDocument(false);
  }
  initFormDocument = (visible, document = emptyDocument) => {
    this.setState({
      formDocumentEditVisible: visible, document: ObjectUtil.cloneObject(document),
    });
  }
  onSave = (object) => {
    const newObject = object;
    newObject.documents = this.props.data.documents;
    this.props.dispatch(CitizenAction.saveCitizen(object));
  };
  showFormDocumentEdit = (document = emptyDocument) => {
    this.initFormDocument(true, document);
  };
  onOkFormDocumentEdit = (document = emptyDocument) => {
    this.initFormDocument(false);
    if (document.id) {
      this.props.dispatch(CitizenAction.editDocumentInCitizen(ObjectUtil.cloneObject(document)));
    } else {
      const newDocument = ObjectUtil.cloneObject(document);
      newDocument.id = moment().unix();
      this.props.dispatch(CitizenAction.addNewDocumentToCitizen(newDocument));
    }
  }
  onCancelFormDocumentEdit = () => {
    this.initFormDocument(false);
  }
  onDeleteDocument = (document) => {
    this.props.dispatch(CitizenAction.removeDocumentFromCitizen(ObjectUtil.cloneObject(document)));
    this.forceUpdate();
  }
  render() {
    return (
      <div>
        <CitizenEdit
          data={this.props.data}
          genderTypes={this.props.genderTypes}
          id={this.props.id}
          isLoading={this.props.isLoading}
          isRequestError={this.props.isRequestError}
          isSaved={this.props.isSaved}
          onSave={this.onSave}
          showFormDocumentEdit={this.showFormDocumentEdit}
          onDeleteDocument={this.onDeleteDocument}
        />
        <CitizenEditDocumentForm
          document={this.state.document}
          documentTypes={this.props.documentTypes}
          formDocumentEditVisible={this.state.formDocumentEditVisible}
          onOkFormDocumentEdit={this.onOkFormDocumentEdit}
          onCancelFormDocumentEdit={this.onCancelFormDocumentEdit}
        />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    data: getCitizenEditData(state),
    genderTypes: getGenderTypeListData(state),
    documentTypes: getDocumentTypeListData(state),
    isLoading: getCitizenIsLoading(state) || getGenderTypeIsLoading(state) ||
               getDocumentTypeIsLoading(state),
    isRequestError: getCitizenIsRequestError(state) || getGenderTypeIsRequestError(state) ||
                    getDocumentTypeIsRequestError(state),
    isSaved: getCitizenIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(CitizenEditPage));
