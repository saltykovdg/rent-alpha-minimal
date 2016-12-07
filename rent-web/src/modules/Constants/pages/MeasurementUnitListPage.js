import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import MeasurementUnitList from './../components/MeasurementUnitList';

// Import Actions
import * as MeasurementUnitAction from './../actions/MeasurementUnitAction';

// Import Selectors
import {
  getMeasurementUnitListData,
  getMeasurementUnitIsLoading,
  getMeasurementUnitIsRequestError,
  getMeasurementUnitIsDeleted,
} from './../reducers/MeasurementUnitReducer';

class MeasurementUnitListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(MeasurementUnitAction.getMeasurementUnits(this.state.page));
  }
  onChangePage = (page) => {
    this.props.dispatch(MeasurementUnitAction.getMeasurementUnits(page));
  };
  onDelete = (object) => {
    this.props.dispatch(MeasurementUnitAction.deleteMeasurementUnit(object));
  };
  render() {
    return (
      <MeasurementUnitList
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
    data: getMeasurementUnitListData(state),
    isLoading: getMeasurementUnitIsLoading(state),
    isRequestError: getMeasurementUnitIsRequestError(state),
    isDeleted: getMeasurementUnitIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(MeasurementUnitListPage));
