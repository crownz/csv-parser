import React from 'react';
import { shallow } from 'enzyme';

import WalletEntry from './wallet-entry';

const defaultProps = {
  wallet: {
    sign: '$',
    amount: 100.1
  },
  exchangeAmount: 100,
  onAmountChange: () => {},
  shouldValidateWallet: false,
  onWalletSelect: () => {}
};

describe('Wallet entry component: ', () => {
  it('should render', () => {
    const driver = getDriver();
    expect(driver.element().exists()).toBe(true);
  });

  it('should render correct balance label', () => {
    const driver = getDriver();
    expect(
      driver
        .element()
        .balance()
        .label()
    ).toEqual('$100.10');
  });

  it('should render valid label, because validation is off', () => {
    const driver = getDriver();
    expect(
      driver
        .element()
        .balance()
        .isInvalid()
    ).toBe(false);
  });

  it('should render valid label, because validation is passed', () => {
    const driver = getDriver({ shouldValidateWallet: true });
    expect(
      driver
        .element()
        .balance()
        .isInvalid()
    ).toBe(false);
  });

  it('should render invalid label', () => {
    const driver = getDriver({ shouldValidateWallet: true, exchangeAmount: 200 });
    expect(
      driver
        .element()
        .balance()
        .isInvalid()
    ).toBe(true);
  });
});

const getDriver = (overrideProps = {}) => {
  const props = { ...defaultProps, ...overrideProps };
  const wrapper = shallow(<WalletEntry {...props} />);

  return {
    element: () => {
      const el = wrapper.find('[data-test-id="wallet-entry"]');
      return {
        exists: () => el.exists(),
        balance: () => {
          const balanceLabel = el.find('BalanceLabel');
          return {
            label: () => balanceLabel.props().formattedAmount,
            isInvalid: () => balanceLabel.props().isInvalid
          };
        }
      };
    }
  };
};
