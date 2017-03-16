import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import NormList from './../components/NormList';

// Import Actions
import * as NormAction from './../actions/NormAction';

// Import Selectors
import {
  getNormListData,
  getNormIsLoading,
  getNormIsRequestError,
  getNormIsDeleted,
} from './../reducers/NormReducer';

class NormListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(NormAction.getNorms(this.state.page));
  }
  onChangePage = (page) => {
    this.props.dispatch(NormAction.getNorms(page));
  };
  onDelete = (object) => {
    this.props.dispatch(NormAction.deleteNorm(object));
  };
  render() {
    return (
      <NormList
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
    data: getNormListData(state),
    isLoading: getNormIsLoading(state),
    isRequestError: getNormIsRequestError(state),
    isDeleted: getNormIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(NormListPage));
