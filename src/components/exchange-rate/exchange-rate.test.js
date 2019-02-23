import React from 'react';
import { shallow } from 'enzyme';

import ExchangeRate from './exchange-rate';

const defaultProps = {
  fromCurrency: '$',
  toCurrency: 'GBP',
  rate: 1.2345678
};

describe('Exchange rate component: ', () => {
  it('should render', () => {
    const driver = getDriver();
    expect(driver.element().exists()).toBe(true);
  });

  it('should render correctly formatted label', () => {
    const driver = getDriver();
    expect(driver.element().label()).toEqual('$1 = GBP1.2346');
  });
});

const getDriver = (overrideProps = {}) => {
  const props = { ...defaultProps, ...overrideProps };
  const wrapper = shallow(<ExchangeRate {...props} />);

  return {
    element: () => {
      const el = wrapper.find('[data-test-id="exchange-rate-container"]');
      return {
        exists: () => el.exists(),
        label: () => {
          const label = el.find('[data-test-id="exchange-rate-label"]');
          return label.text();
        }
      };
    }
  };
};
