import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import MeterList from './../components/MeterList';

// Import Actions
import * as MeterAction from './../actions/MeterAction';

// Import Selectors
import {
  getMeterListData,
  getMeterIsLoading,
  getMeterIsRequestError,
  getMeterIsDeleted,
} from './../reducers/MeterReducer';

class MeterListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(MeterAction.getMeters(this.state.page));
  }
  onChangePage = (page) => {
    this.props.dispatch(MeterAction.getMeters(page));
  };
  onDelete = (object) => {
    this.props.dispatch(MeterAction.deleteMeter(object));
  };
  render() {
    return (
      <MeterList
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
    data: getMeterListData(state),
    isLoading: getMeterIsLoading(state),
    isRequestError: getMeterIsRequestError(state),
    isDeleted: getMeterIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(MeterListPage));
