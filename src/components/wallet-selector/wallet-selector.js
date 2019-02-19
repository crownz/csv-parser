import React, { memo } from 'react';

import styles from './wallet-selector.css';

const WalletSelector = ({ value, onChange }) => <div className={styles.container}>{value}</div>;

export default memo(WalletSelector);
