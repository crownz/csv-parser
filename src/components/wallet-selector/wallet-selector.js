import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ArrowDownIcon from '../../icons/arrow-down.svg';

import styles from './wallet-selector.css';

class WalletSelector extends PureComponent {
  state = {
    isActive: false
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  toggleActive = () => this.setState(prevState => ({ isActive: !prevState.isActive }));
  setInactive = () => this.setState({ isActive: false });

  handleWalletClick = id => {
    if (id !== this.props.value) {
      this.props.onChange(id);
    }
    this.setInactive();
  };

  handleClickOutside = e => {
    if (this.dropdownRef && !this.dropdownRef.contains(e.target)) {
      this.setInactive();
    }
  };

  setDropdownRef = ref => (this.dropdownRef = ref);

  render() {
    const { value, wallets } = this.props;
    const { isActive } = this.state;
    return (
      <div className={styles.container} data-test-id="wallet-selector">
        <div
          className={styles.label}
          role="button"
          onClick={this.toggleActive}
          data-test-id="wallet-selector-label"
        >
          {value}
          <ArrowDownIcon />
        </div>
        {isActive && (
          <div
            className={styles.dropdown}
            data-test-id="wallet-selector-dropdown"
            ref={this.setDropdownRef}
          >
            {wallets.map(wallet => (
              <div
                className={`${styles.walletEntry} ${value === wallet.id ? styles.active : ''}`}
                key={wallet.id}
                onClick={() => this.handleWalletClick(wallet.id)}
              >
                {`${wallet.id} · ${wallet.amount.toFixed(2)}`}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

WalletSelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  wallets: PropTypes.arrayOf(
    PropTypes.shape({
      sign: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired
    })
  ).isRequired
};

export default WalletSelector;
