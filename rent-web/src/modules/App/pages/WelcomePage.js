import React from 'react';
import { FormattedMessage } from 'react-intl';

import { ExtendedComponentPage } from './../../../components/ExtendedComponentPage';

class WelcomePage extends ExtendedComponentPage {
  render() {
    return (
      <div>
        <h1>
          <FormattedMessage id="welcomePageTitle" />
        </h1>
        <p>
          <FormattedMessage id="welcomePageText" />
        </p>
      </div>
    );
  }
}

export default WelcomePage;
