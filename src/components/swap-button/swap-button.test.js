import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import SwapButton from './swap-button';

const defaultProps = {
  onClick: () => {}
};

describe('Swap button component: ', () => {
  it('should render', () => {
    const driver = getDriver();
    expect(driver.element().exists()).toBe(true);
  });

  it('should call onClick', () => {
    const onClickSpy = sinon.spy();
    const driver = getDriver({ onClick: onClickSpy });
    driver.element().click();
    expect(onClickSpy.calledOnce).toBe(true);
  });
});

const getDriver = (overrideProps = {}) => {
  const props = { ...defaultProps, ...overrideProps };
  const wrapper = shallow(<SwapButton {...props} />);

  return {
    element: () => {
      const el = wrapper.find('[data-test-id="swap-button"]');
      return {
        exists: () => el.exists(),
        click: () => el.simulate('click')
      };
    }
  };
};
