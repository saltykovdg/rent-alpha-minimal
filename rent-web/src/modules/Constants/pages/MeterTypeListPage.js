import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import MeterTypeList from './../components/MeterTypeList';

// Import Actions
import * as MeterTypeAction from './../actions/MeterTypeAction';

// Import Selectors
import {
  getMeterTypeListData,
  getMeterTypeIsLoading,
  getMeterTypeIsRequestError,
  getMeterTypeIsDeleted,
} from './../reducers/MeterTypeReducer';

class MeterTypeListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(MeterTypeAction.getMeterTypes(this.state.page));
  }
  onChangePage = (page) => {
    this.props.dispatch(MeterTypeAction.getMeterTypes(page));
  };
  onDelete = (object) => {
    this.props.dispatch(MeterTypeAction.deleteMeterType(object));
  };
  render() {
    return (
      <MeterTypeList
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
    data: getMeterTypeListData(state),
    isLoading: getMeterTypeIsLoading(state),
    isRequestError: getMeterTypeIsRequestError(state),
    isDeleted: getMeterTypeIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(MeterTypeListPage));
