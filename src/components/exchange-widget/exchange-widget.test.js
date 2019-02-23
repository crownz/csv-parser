import React from 'react';
import { shallow } from 'enzyme';

import Exchangewidget from './exchange-widget';

const defaultProps = {
  exchangeRate: null,
  activeWallet: {
    amount: 100
  },
  resultWallet: {},
  deduction: 123,
  swapWallets: () => {},
  exchangeCurrencies: () => {}
};

describe('Exchange widget component: ', () => {
  it('should render', () => {
    const driver = getDriver();
    expect(driver.element().exists()).toBe(true);
  });

  it('should render without exchange rate', () => {
    const driver = getDriver();
    expect(driver.element().hasExchangeRate()).toBe(false);
  });

  it('should render with exchange rate', () => {
    const driver = getDriver({ exchangeRate: 1.2345 });
    expect(driver.element().hasExchangeRate()).toBe(true);
  });

  it('should render disabled button when deduction is higher than wallet', () => {
    const driver = getDriver();
    expect(
      driver
        .element()
        .button()
        .isDisabled()
    ).toBe(true);
  });

  it('should render disabled button when deduction is less than 10 cents', () => {
    const driver = getDriver({ deduction: 0.05 });
    expect(
      driver
        .element()
        .button()
        .isDisabled()
    ).toBe(true);
  });

  it('should render disabled button when deduction is not entered', () => {
    const driver = getDriver({ deduction: undefined });
    expect(
      driver
        .element()
        .button()
        .isDisabled()
    ).toBe(true);
  });

  it('should render enabled button when all rules are met', () => {
    const driver = getDriver({ deduction: 80 });
    expect(
      driver
        .element()
        .button()
        .isDisabled()
    ).toBe(false);
  });
});

const getDriver = (overrideProps = {}) => {
  const props = { ...defaultProps, ...overrideProps };
  const wrapper = shallow(<Exchangewidget {...props} />);

  return {
    element: () => {
      const el = wrapper.find('[data-test-id="exchange-widget"]');
      return {
        exists: () => el.exists(),
        hasExchangeRate: () => el.find('ExchangeRate').exists(),
        button: () => {
          const button = el.find('Button');
          return {
            isDisabled: () => button.props().disabled
          };
        }
      };
    }
  };
};
