import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import DocumentTypeEdit from './../components/DocumentTypeEdit';

// Import Actions
import * as DocumentTypeAction from './../actions/DocumentTypeAction';

// Import Selectors
import {
  getDocumentTypeEditData,
  getDocumentTypeIsLoading,
  getDocumentTypeIsRequestError,
  getDocumentTypeIsSaved,
} from './../reducers/DocumentTypeReducer';

class DocumentTypeEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(DocumentTypeAction.getDocumentType(id));
    } else {
      this.props.dispatch(DocumentTypeAction.newDocumentType());
    }
  }
  onSave = (object) => {
    this.props.dispatch(DocumentTypeAction.saveDocumentType(object));
  };
  render() {
    return (
      <DocumentTypeEdit
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
    data: getDocumentTypeEditData(state),
    isLoading: getDocumentTypeIsLoading(state),
    isRequestError: getDocumentTypeIsRequestError(state),
    isSaved: getDocumentTypeIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(DocumentTypeEditPage));
