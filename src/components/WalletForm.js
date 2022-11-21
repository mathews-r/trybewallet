import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addForm, deleteItem, fetchAPIThunk, saveEdit } from '../redux/actions/index';
import fetchAPI from '../services/walletAPI';
import '../styles/form.css';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }
  
  componentDidMount = async () => {
    const { getCoinsDispatch } = this.props;
    const data = await fetchAPI();
    this.setState({ exchangeRates: data })
    getCoinsDispatch();
  };
  
  handleForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };
  
  saveFormState = async (event) => {
    event.preventDefault();
    const { getDataFormDispatch } = this.props;

    getDataFormDispatch(this.state);

    this.setState((prevState) => ({
      value: '',
      description: '',
      id: prevState.id + 1,
    }));
  };

  saveEdit = (event) => {
    event.preventDefault();
    const { wallet, saveEditDispatch, deleteItemDispatch } = this.props;
    const { value, description, currency, method, tag, exchangeRates } = this.state;

    const obj = { expenses: {
      id: wallet.idToEdit,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    },
    editor: false };
    deleteItemDispatch(wallet.idToEdit);
    saveEditDispatch(obj);
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form className="form">
        <label htmlFor="value">
          Valor:
          {' '}
          <input
            className="inputsForm"
            placeholder="Digite o valor da despesa"
            type="number"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleForm }
          />
        </label>

        <label htmlFor="description">
          Descrição:
          {' '}
          <input
            className="inputsForm"
            type="text"
            name="description"
            value={ description }
            data-testid="description-input"
            placeholder="Digite a descrição"
            onChange={ this.handleForm }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          {' '}
          <select
            className="inputsForm"
            type="text"
            data-testid="currency-input"
            onChange={ this.handleForm }
            name="currency"
            value={ currency }
          >
            {currencies.map((coin) => (
              <option data-testid="currency-option" key={ coin }>
                {coin}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="method">
          Método de pagamento:
          {' '}
          <select
            className="inputsForm"
            type="text"
            data-testid="method-input"
            onChange={ this.handleForm }
            name="method"
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag:
          {' '}
          <select
            className="inputsForm"
            type="text"
            data-testid="tag-input"
            onChange={ this.handleForm }
            name="tag"
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        {editor ? (
          <button
            type="button"
            className="buttonsExpense"
            data-testid="btn-edit-expense"
            onClick={ this.saveEdit }
          >
            Editar despesa

          </button>
        ) : (
          <button
            className="buttonsExpense"
            type="submit"
            onClick={ this.saveFormState }
          >
            Adicionar despesa
          </button>
        )}
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCoinsDispatch: () => dispatch(fetchAPIThunk()),
  getDataFormDispatch: (payload) => dispatch(addForm(payload)),
  saveEditDispatch: (payload) => dispatch(saveEdit(payload)),
  deleteItemDispatch: (payload) => dispatch(deleteItem(payload)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  wallet: state.wallet,
});

WalletForm.propTypes = {
  getCoinsDispatch: PropTypes.func,
  currencies: PropTypes.arrayOf({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
