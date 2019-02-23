import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchExchangeRate } from '../actions/exchange';

const withLiveRates = Component => {
  class WithLiveRates extends React.Component {
    componentDidMount() {
      this.props.updateRates(this.props.currency);
      setInterval(() => this.props.updateRates(this.props.currency), 10000);
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  WithLiveRates.propTypes = {
    updateRates: PropTypes.func.isRequired,
    currency: PropTypes.string.isRequired
  };

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
