import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../styles/header.css';

class Header extends Component {
  render() {
    const { user, expenses } = this.props;
    return (
      <header className="header">
        <h3 data-testid="email-field">{`Usuário: ${user}`}</h3>
        <div className="total">
          <p className="total-p">TOTAL DE DESPESAS:</p>
          <p data-testid="total-field">
            {
              expenses.reduce((acc, curr) => {
                const { currency, exchangeRates } = curr;
                acc += Number(exchangeRates[currency].ask) * curr.value;
                return acc;
              }, 0).toFixed(2)
            }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  user: PropTypes.string,
  wallet: PropTypes.arrayOf({}),
}.isRequired;

export default connect(mapStateToProps)(Header);
