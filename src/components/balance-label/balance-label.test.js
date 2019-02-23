import React from 'react';
import { shallow } from 'enzyme';

import BalanceLabel from './balance-label';

const defaultProps = {
  formattedAmount: '$100.31'
};

describe('Balance label component: ', () => {
  it('should render', () => {
    const driver = getDriver();
    expect(driver.element().exists()).toBe(true);
  });

  it('should render correct label', () => {
    const driver = getDriver();
    expect(driver.element().text()).toEqual('Balance: $100.31');
  });

  it('should render invalid class', () => {
    const driver = getDriver({ isInvalid: true });
    expect(driver.element().hasClass('invalid')).toBe(true);
  });
});

const getDriver = (overrideProps = {}) => {
  const props = { ...defaultProps, ...overrideProps };
  const wrapper = shallow(<BalanceLabel {...props} />);

  return {
    element: () => {
      const el = wrapper.find('[data-test-id="balance-label"]');
      return {
        exists: () => el.exists(),
        text: () => el.text(),
        hasClass: className => el.hasClass(className)
      };
    }
  };
};
