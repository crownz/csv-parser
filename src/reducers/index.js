import { combineReducers } from 'redux';

import exchange from './exchange';
import wallets from './wallets';

export default combineReducers({
  exchange,
  wallets
});
