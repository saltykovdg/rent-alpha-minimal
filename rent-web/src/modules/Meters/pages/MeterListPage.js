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
      searchFieldMeterType: '',
      searchFieldService: '',
      searchFieldName: '',
      searchFieldSerialNumber: '',
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(MeterAction.findMeters(
      this.state.searchFieldMeterType,
      this.state.searchFieldService,
      this.state.searchFieldName,
      this.state.searchFieldSerialNumber,
      this.state.page,
    ));
  }
  onSearch = (meterType, service, name, serialNumber) => {
    this.setState({
      page: 0,
      searchFieldMeterType: meterType,
      searchFieldService: service,
      searchFieldName: name,
      searchFieldSerialNumber: serialNumber,
    });
    this.props.dispatch(MeterAction.findMeters(meterType, service, name, serialNumber, 0));
  }
  onChangePage = (page) => {
    this.setState({ page });
    this.props.dispatch(MeterAction.findMeters(
      this.state.searchFieldMeterType,
      this.state.searchFieldService,
      this.state.searchFieldName,
      this.state.searchFieldSerialNumber,
      page));
  };
  onDelete = (object) => {
    this.props.dispatch(MeterAction.deleteMeter(
      object,
      this.state.searchFieldMeterType,
      this.state.searchFieldService,
      this.state.searchFieldName,
      this.state.searchFieldSerialNumber,
      this.getActualPageAfterDelete(),
    ));
  };
  render() {
    if (!this.props.data) return null;
    return (
      <MeterList
        data={this.props.data}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
        isDeleted={this.props.isDeleted}
        onChangePage={this.onChangePage}
        onDelete={this.onDelete}
        onSearch={this.onSearch}
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
