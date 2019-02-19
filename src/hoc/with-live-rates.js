import React from 'react';
import { connect } from 'react-redux';

import { fetchExchangeRate } from '../actions/exchange';

const withLiveRates = Component => {
  class WithLiveRates extends React.Component {
    componentDidMount() {
      this.props.updateRates(this.props.currency);
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    currency: state.exchange.baseCurrency
  });

  const mapDispatchToProps = {
    updateRates: fetchExchangeRate
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithLiveRates);
};

export default withLiveRates;
