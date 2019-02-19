import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import ExchangeWidget from './components/exchange-widget';
import rootReducer from './reducers';
import withLiveRates from './hoc/with-live-rates';

import './index.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

const Widget = withLiveRates(ExchangeWidget);

const App = () => (
  <Provider store={store}>
    <Widget />
  </Provider>
);

render(<App />, document.getElementById('root'));
