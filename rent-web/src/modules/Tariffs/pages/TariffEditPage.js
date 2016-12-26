import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

// Import Components
import TariffEdit from './../components/TariffEdit';

// Import Actions
import * as TariffAction from './../actions/TariffAction';

// Import Selectors
import {
  getTariffEditData,
  getTariffIsLoading,
  getTariffIsRequestError,
  getTariffIsSaved,
} from './../reducers/TariffReducer';

class TariffEditPage extends ExtendedComponentPage {
  componentWillMount() {
    super.componentWillMount();
    const id = this.props.params.id;
    if (id) {
      this.props.dispatch(TariffAction.getTariff(id));
    } else {
      this.props.dispatch(TariffAction.newTariff());
    }
  }
  onSave = (object) => {
    this.props.dispatch(TariffAction.saveTariff(object));
  };
  render() {
    return (
      <TariffEdit
        data={this.props.data}
        id={this.props.id}
        isLoading={this.props.isLoading}
        isRequestError={this.props.isRequestError}
        isSaved={this.props.isSaved}
        onSave={this.onSave}
      />
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    data: getTariffEditData(state),
    isLoading: getTariffIsLoading(state),
    isRequestError: getTariffIsRequestError(state),
    isSaved: getTariffIsSaved(state),
    id: props.params.id,
  };
}

export default connect(mapStateToProps)(injectIntl(TariffEditPage));
