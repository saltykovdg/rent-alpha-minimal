import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import CitizenList from './../components/CitizenList';

// Import Actions
import * as CitizenAction from './../actions/CitizenAction';

// Import Selectors
import {
  getCitizenListData,
  getCitizenIsLoading,
  getCitizenIsRequestError,
  getCitizenIsDeleted,
} from './../reducers/CitizenReducer';

class CitizenListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(CitizenAction.getCitizens(this.state.page));
  }
  onChangePage = (page) => {
    this.props.dispatch(CitizenAction.getCitizens(page));
  };
  onDelete = (object) => {
    this.props.dispatch(CitizenAction.deleteCitizen(object));
  };
  render() {
    return (
      <CitizenList
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
    data: getCitizenListData(state),
    isLoading: getCitizenIsLoading(state),
    isRequestError: getCitizenIsRequestError(state),
    isDeleted: getCitizenIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(CitizenListPage));
