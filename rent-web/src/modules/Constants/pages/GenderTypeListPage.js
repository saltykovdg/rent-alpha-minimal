import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import GenderTypeList from './../components/GenderTypeList';

// Import Actions
import * as GenderTypeAction from './../actions/GenderTypeAction';

// Import Selectors
import {
  getGenderTypeListData,
  getGenderTypeIsLoading,
  getGenderTypeIsRequestError,
  getGenderTypeIsDeleted,
} from './../reducers/GenderTypeReducer';

class GenderTypeListPage extends ExtendedComponentPage {
  constructor(props, context) {
    super(props, context);
    const page = context.router.location.query.page;
    this.state = {
      page: page ? page - 1 : 0,
    };
  }
  componentWillMount() {
    super.componentWillMount();
    this.props.dispatch(GenderTypeAction.getGenderTypes(this.state.page));
  }
  onChangePage = (page) => {
    this.setState({ page });
    this.props.dispatch(GenderTypeAction.getGenderTypes(page));
  };
  onDelete = (object) => {
    this.props.dispatch(GenderTypeAction.deleteGenderType(object, this.getActualPageAfterDelete()));
  };
  render() {
    if (!this.props.data) return null;
    return (
      <GenderTypeList
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
    data: getGenderTypeListData(state),
    isLoading: getGenderTypeIsLoading(state),
    isRequestError: getGenderTypeIsRequestError(state),
    isDeleted: getGenderTypeIsDeleted(state),
  };
}

export default connect(mapStateToProps)(injectIntl(GenderTypeListPage));
