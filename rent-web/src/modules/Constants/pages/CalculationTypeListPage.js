import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import CalculationTypeList from './../components/CalculationTypeList';

// Import Actions
import * as CalculationTypeAction from './../actions/CalculationTypeAction';

// Import Selectors
import {
  getCalculationTypeListData,
  getCalculationTypeIsLoading,
  getCalculationTypeIsRequestError,
  getCalculationTypeIsDeleted,
} from './../reducers/CalculationTypeReducer';

class CalculationTypeListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(CalculationTypeAction.getCalculationTypes(this.state.page));
  }
  onChangePage = (page) => {
    this.props.dispatch(CalculationTypeAction.getCalculationTypes(page));
  };
  onDelete = (object) => {
    this.props.dispatch(CalculationTypeAction.deleteCalculationType(object));
  };
  render() {
    return (
      <CalculationTypeList
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
    data: getCalculationTypeListData(state),
    isLoading: getCalculationTypeIsLoading(state),
    isRequestError: getCalculationTypeIsRequestError(state),
    isDeleted: getCalculationTypeIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(CalculationTypeListPage));
