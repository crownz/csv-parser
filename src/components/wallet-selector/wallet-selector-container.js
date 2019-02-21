import { connect } from 'react-redux';

import WalletSelector from './wallet-selector';

const mapStateToProps = state => ({
  wallets: Object.keys(state.wallets).map(key => state.wallets[key])
});

export default connect(mapStateToProps)(WalletSelector);
