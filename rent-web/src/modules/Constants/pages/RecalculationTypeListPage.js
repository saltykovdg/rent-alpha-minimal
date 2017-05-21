import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import RecalculationTypeList from './../components/RecalculationTypeList';

// Import Actions
import * as RecalculationTypeAction from './../actions/RecalculationTypeAction';

// Import Selectors
import {
  getRecalculationTypeListData,
  getRecalculationTypeIsLoading,
  getRecalculationTypeIsRequestError,
  getRecalculationTypeIsDeleted,
} from './../reducers/RecalculationTypeReducer';

class RecalculationTypeListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(RecalculationTypeAction.getRecalculationTypes(this.state.page));
  }
  onChangePage = (page) => {
    this.setState({ page });
    this.props.dispatch(RecalculationTypeAction.getRecalculationTypes(page));
  };
  onDelete = (object) => {
    this.props.dispatch(RecalculationTypeAction.deleteRecalculationType(object, this.getActualPageAfterDelete()));
  };
  render() {
    return (
      <RecalculationTypeList
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
    data: getRecalculationTypeListData(state),
    isLoading: getRecalculationTypeIsLoading(state),
    isRequestError: getRecalculationTypeIsRequestError(state),
    isDeleted: getRecalculationTypeIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(RecalculationTypeListPage));
