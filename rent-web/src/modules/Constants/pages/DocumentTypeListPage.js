import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import DocumentTypeList from './../components/DocumentTypeList';

// Import Actions
import * as DocumentTypeAction from './../actions/DocumentTypeAction';

// Import Selectors
import {
  getDocumentTypeListData,
  getDocumentTypeIsLoading,
  getDocumentTypeIsRequestError,
  getDocumentTypeIsDeleted,
} from './../reducers/DocumentTypeReducer';

class DocumentTypeListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(DocumentTypeAction.getDocumentTypes(this.state.page));
  }
  onChangePage = (page) => {
    this.setState({ page });
    this.props.dispatch(DocumentTypeAction.getDocumentTypes(page));
  };
  onDelete = (object) => {
    this.props.dispatch(DocumentTypeAction.deleteDocumentType(object, this.getActualPageAfterDelete()));
  };
  render() {
    return (
      <DocumentTypeList
        data={this.props.data}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
        isDeleted={this.props.isDeleted}
        onChangePage={this.onChangePage}
        onDelete={this.onDelete}
      />
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    data: getDocumentTypeListData(state),
    isLoading: getDocumentTypeIsLoading(state),
    isRequestError: getDocumentTypeIsRequestError(state),
    isDeleted: getDocumentTypeIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(DocumentTypeListPage));
