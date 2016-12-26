import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import TariffList from './../components/TariffList';

// Import Actions
import * as TariffAction from './../actions/TariffAction';

// Import Selectors
import {
  getTariffListData,
  getTariffIsLoading,
  getTariffIsRequestError,
  getTariffIsDeleted,
} from './../reducers/TariffReducer';

class TariffListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(TariffAction.getTariffs(this.state.page));
  }
  onChangePage = (page) => {
    this.props.dispatch(TariffAction.getTariffs(page));
  };
  onDelete = (object) => {
    this.props.dispatch(TariffAction.deleteTariff(object));
  };
  render() {
    return (
      <TariffList
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
    data: getTariffListData(state),
    isLoading: getTariffIsLoading(state),
    isRequestError: getTariffIsRequestError(state),
    isDeleted: getTariffIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(TariffListPage));
