import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import WalletSelector from './wallet-selector';

const wallets = [
  {
    sign: '$',
    id: 'USD',
    amount: 100.53
  },
  {
    sign: '£',
    id: 'GBP',
    amount: 15.3
  },
  {
    sign: '€',
    id: 'EUR',
    amount: 300
  }
];

const defaultProps = {
  wallets: [],
  value: 'GBP',
  onChange: () => {}
};

describe('Wallet selector component: ', () => {
  it('should render', () => {
    const driver = getDriver();
    expect(driver.element().exists()).toBe(true);
  });

  it('should render label with value', () => {
    const driver = getDriver();
    expect(
      driver
        .element()
        .label()
        .content()
    ).toEqual('GBP');
  });

  it('should not render dropdown by default', () => {
    const driver = getDriver();
    expect(
      driver
        .element()
        .dropdown()
        .exists()
    ).toBe(false);
  });

  it('should render dropdown after label click', () => {
    const driver = getDriver();
    driver
      .element()
      .label()
      .click();
    expect(
      driver
        .element()
        .dropdown()
        .exists()
    ).toBe(true);
  });

  it('should render empty dropdown', () => {
    const driver = getDriver();
    driver
      .element()
      .label()
      .click();
    expect(
      driver
        .element()
        .dropdown()
        .values()
        .count()
    ).toEqual(0);
  });

  it('should render dropdown with 3 values', () => {
    const driver = getDriver({ wallets });
    driver
      .element()
      .label()
      .click();
    expect(
      driver
        .element()
        .dropdown()
        .values()
        .count()
    ).toEqual(3);
  });

  it('should render gbp value active', () => {
    const driver = getDriver({ wallets });
    driver
      .element()
      .label()
      .click();
    expect(
      driver
        .element()
        .dropdown()
        .values()
        .at(1)
        .isActive()
    ).toBe(true);
  });

  it('should render correctly formatted value label', () => {
    const driver = getDriver({ wallets });
    driver
      .element()
      .label()
      .click();
    expect(
      driver
        .element()
        .dropdown()
        .values()
        .at(1)
        .label()
    ).toEqual('GBP · 15.30');
  });

  it('should call onChange', () => {
    const onChangeSpy = sinon.spy();
    const driver = getDriver({ onChange: onChangeSpy, wallets });
    driver
      .element()
      .label()
      .click();
    driver
      .element()
      .dropdown()
      .values()
      .at(0)
      .select();
    expect(onChangeSpy.calledOnce).toBe(true);
  });

  it('should not call onChange when selecting active value', () => {
    const onChangeSpy = sinon.spy();
    const driver = getDriver({ onChange: onChangeSpy, wallets });
    driver
      .element()
      .label()
      .click();
    driver
      .element()
      .dropdown()
      .values()
      .at(1)
      .select();
    expect(onChangeSpy.calledOnce).toBe(false);
  });

  it('should close dropdown on value change', () => {
    const onChangeSpy = sinon.spy();
    const driver = getDriver({ onChange: onChangeSpy, wallets });
    driver
      .element()
      .label()
      .click();
    driver
      .element()
      .dropdown()
      .values()
      .at(0)
      .select();
    expect(
      driver
        .element()
        .dropdown()
        .exists()
    ).toBe(false);
  });
});

const getDriver = (overrideProps = {}) => {
  const props = { ...defaultProps, ...overrideProps };
  const wrapper = shallow(<WalletSelector {...props} />);

  return {
    element: () => {
      const el = wrapper.find('[data-test-id="wallet-selector"]');
      return {
        exists: () => el.exists(),
        label: () => {
          const label = el.find('[data-test-id="wallet-selector-label"]');
          return {
            content: () => label.text(),
            click: () => label.simulate('click')
          };
        },
        value: () => el.props().value,
        dropdown: () => {
          const dropdown = el.find('[data-test-id="wallet-selector-dropdown"]');
          return {
            exists: () => dropdown.exists(),
            values: () => {
              const values = dropdown.children();
              return {
                count: () => values.length,
                at: index => {
                  const value = values.at(index);
                  return {
                    isActive: () => value.hasClass('active'),
                    label: () => value.text(),
                    select: () => value.simulate('click')
                  };
                }
              };
            }
          };
        }
      };
    }
  };
};
