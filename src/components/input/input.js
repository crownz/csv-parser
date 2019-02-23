import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { roundToTwoDecimals } from '../../libs/currency-utils';
import { validateNumberInput } from '../../libs/validation';

import styles from './input.css';

class Input extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ''
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value !== Number(this.state.value)) {
      const value = newProps.value ? roundToTwoDecimals(newProps.value) : '';
      this.setState({ value });
    }
  }

  handleChange = e => {
    const { value } = e.target;

    if (validateNumberInput(value)) {
      this.setState(
        {
          value
        },
        () => this.props.onChange(Number(value))
      );
    }
  };

  render() {
    const { placeholder } = this.props;
    const { value } = this.state;
    return (
      <input
        value={value}
        onChange={this.handleChange}
        placeholder={placeholder}
        className={styles.input}
        data-test-id="input"
      />
    );
  }
}

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
};

Input.defaultProps = {
  value: ''
};

export default Input;
