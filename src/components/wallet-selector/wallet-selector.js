import React, { PureComponent } from 'react';

import ArrowDownIcon from '../../icons/arrow-down.svg';

import styles from './wallet-selector.css';

class WalletSelector extends PureComponent {
  state = {
    isActive: false
  };

  toggleActive = () => this.setState(prevState => ({ isActive: !prevState.isActive }));
  setInactive = () => this.setState({ isActive: false });

  handleWalletClick = id => {
    if (id !== this.props.value) {
      this.props.onChange(id);
    }
    this.setInactive();
  };

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
          <div className={styles.dropdown} data-test-id="wallet-selector-dropdown">
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

export default WalletSelector;
