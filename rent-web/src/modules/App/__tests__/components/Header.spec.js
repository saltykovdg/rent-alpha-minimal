import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';
import Header from '../../components/Header/Header';
import { intl } from '../../../../util/react-intl-test-helper';

const enabledLanguages = ['en', 'ru'];
const intlProp = { ...intl, enabledLanguages };

const props = {
  intl: intlProp,
};

describe('renders the Header properly', () => {
  const wrapper = shallow(<Header {...props} />);
  it('contains ul element', () => {
    expect(wrapper.find('ul').length).toBe(1);
  });
  it('contains li element', () => {
    expect(wrapper.find('li').length).toBe(2);
  });
  it('contains Link element', () => {
    expect(wrapper.find('Link').length).toBe(2);
  });
  it('contains linkMain text element', () => {
    expect(wrapper.find('Link [to="/"]').containsMatchingElement(<FormattedMessage id="linkMain" />)).toBe(true);
  });
  it('contains linkMessages text element', () => {
    expect(wrapper.find('Link [to="/message"]').containsMatchingElement(<FormattedMessage id="linkMessages" />)).toBe(true);
  });
});
