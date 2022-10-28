import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem, editItem } from '../redux/actions';

import '../styles/table.css';

class Table extends Component {
  removeExpense = (index) => {
    const { deleteItemDispatch } = this.props;
    deleteItemDispatch(index);
  };

  editExpense = (id) => {
    const { editFormDispatch } = this.props;
    const obj = { editor: true, id };
    editFormDispatch(obj);
  };

  render() {
    const { expenses } = this.props;
    return (
      <table className="table">
        <thead className="thead">
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody className="tbody">
          {expenses.map((despesa, index) => (
            <tr key={ index }>
              <td>{despesa.description}</td>
              <td>{despesa.tag}</td>
              <td>{despesa.method}</td>
              <td>{Number(despesa.value).toFixed(2)}</td>
              <td>{despesa.exchangeRates[despesa.currency].name}</td>
              <td>
                {Number(despesa.exchangeRates[despesa.currency].ask).toFixed(2)}
              </td>
              <td>
                {Number(despesa.value).toFixed(2)
                  * Number(despesa.exchangeRates[despesa.currency].ask)}
              </td>
              <td>REAL</td>
              <td>
                <button
                  type="button"
                  className="buttonsEditRemove"
                  data-testid="edit-btn"
                  key={ Math.random() }
                  onClick={ () => this.editExpense(despesa.id) }
                >
                  Editar despesa
                </button>
                <button
                  className="buttonsEditRemove"
                  type="button"
                  name="delete-btn"
                  data-testid="delete-btn"
                  key={ despesa.id }
                  onClick={ () => this.removeExpense(despesa.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editFormDispatch: (payload) => dispatch(editItem(payload)),
  deleteItemDispatch: (payload) => dispatch(deleteItem(payload)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
