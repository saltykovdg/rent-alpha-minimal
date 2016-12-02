import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';
import WelcomePage from '../../pages/WelcomePage';
import { intl } from '../../../../util/react-intl-test-helper';

const enabledLanguages = ['en', 'ru'];
const intlProp = { ...intl, enabledLanguages };

const props = {
  intl: intlProp,
};

describe('renders the WelcomePage properly', () => {
  const wrapper = shallow(<WelcomePage {...props} />);
  it('contains div element', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
  it('contains h1 element', () => {
    expect(wrapper.find('h1').length).toBe(1);
  });
  it('contains p element', () => {
    expect(wrapper.find('p').length).toBe(1);
  });
  it('contains welcomePageTitle text element', () => {
    expect(wrapper.find('h1').containsMatchingElement(<FormattedMessage id="welcomePageTitle" />)).toBe(true);
  });
  it('contains welcomePageText text element', () => {
    expect(wrapper.find('p').containsMatchingElement(<FormattedMessage id="welcomePageText" />)).toBe(true);
  });
});
