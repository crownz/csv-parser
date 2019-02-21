import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import ExchangeWidget from './components/exchange-widget';
import withLiveRates from './hoc/with-live-rates';
import createStore from './libs/create-store';

import './index.css';

const store = createStore();

const Widget = withLiveRates(ExchangeWidget);

const App = () => (
  <Provider store={store}>
    <Widget />
  </Provider>
);

render(<App />, document.getElementById('root'));
