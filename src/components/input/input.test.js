import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Input from './input';

const defaultProps = {
  placeholder: '0',
  value: undefined,
  onChange: () => {}
};

describe('Input component: ', () => {
  it('should render', () => {
    const driver = getDriver();
    expect(driver.element().exists()).toBe(true);
  });

  it('should set placeholder', () => {
    const driver = getDriver();
    expect(driver.element().placeholder()).toEqual('0');
  });

  it('should set empty string value, when value is undefined', () => {
    const driver = getDriver();
    expect(driver.element().value()).toEqual('');
  });

  it('should call onChange', () => {
    const onChangeSpy = sinon.spy();
    const driver = getDriver({ onChange: onChangeSpy });
    driver.element().changeValue('123');
    expect(onChangeSpy.calledOnce).toBe(true);
  });

  it('should not call onChange with incorrect values', () => {
    const onChangeSpy = sinon.spy();
    const driver = getDriver({ onChange: onChangeSpy });
    driver.element().changeValue('a');
    driver.element().changeValue('01');
    driver.element().changeValue('-1');
    expect(onChangeSpy.calledOnce).toBe(false);
  });

  it('should call onChange with removed dot', () => {
    const onChangeSpy = sinon.spy();
    const driver = getDriver({ onChange: onChangeSpy });
    driver.element().changeValue('123.');
    expect(onChangeSpy.calledWith(123)).toBe(true);
  });

  it('should update state with kept dot', () => {
    const driver = getDriver();
    driver.element().changeValue('123.');
    expect(driver.element().value()).toEqual('123.');
  });

  it('should update rounded value on prop change', () => {
    const driver = getDriver();
    driver.element().updateValueProp(12.2341);
    expect(driver.element().value()).toEqual(12.23);
  });
});

const getDriver = (overrideProps = {}) => {
  const props = { ...defaultProps, ...overrideProps };
  const wrapper = shallow(<Input {...props} />);

  return {
    element: () => {
      const el = wrapper.find('[data-test-id="input"]');
      return {
        exists: () => el.exists(),
        value: () => el.props().value,
        placeholder: () => el.props().placeholder,
        changeValue: value => el.simulate('change', { target: { value } }),
        updateValueProp: value => wrapper.setProps({ value })
      };
    }
  };
};
