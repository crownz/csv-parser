import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Button from './button';

const defaultProps = {
  onClick: () => {}
};

describe('Button component: ', () => {
  it('should render', () => {
    const driver = getDriver();
    expect(driver.element().exists()).toBe(true);
  });

  it('should render correct label', () => {
    const driver = getDriver();
    expect(driver.element().text()).toEqual('Exchange');
  });

  it('should call onClick', () => {
    const onClickSpy = sinon.spy();
    const driver = getDriver({ onClick: onClickSpy });
    driver.element().click();
    expect(onClickSpy.calledOnce).toBe(true);
  });

  it('should not call onClick when disabled', () => {
    const onClickSpy = sinon.spy();
    const driver = getDriver({ onClick: onClickSpy, disabled: true });
    driver.element().click();
    expect(onClickSpy.calledOnce).toBe(false);
  });

  it('should render disabled class', () => {
    const driver = getDriver({ disabled: true });
    expect(driver.element().hasClass('disabled')).toBe(true);
  });
});

const getDriver = (overrideProps = {}) => {
  const props = { ...defaultProps, ...overrideProps };
  const wrapper = shallow(<Button {...props}>Exchange</Button>);

  return {
    element: () => {
      const el = wrapper.find('[data-test-id="button"]');
      return {
        exists: () => el.exists(),
        text: () => el.text(),
        click: () => el.simulate('click'),
        hasClass: className => el.hasClass(className)
      };
    }
  };
};
