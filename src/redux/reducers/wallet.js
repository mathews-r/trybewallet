import { ADD_FORM, ADD_WALLET, DELETE_ITEM, EDIT_ITEM, SAVE_EDIT } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const minusOne = -1;

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_WALLET:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_FORM:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_ITEM:
    return {
      ...state,
      expenses: [...state.expenses.filter((item) => item.id !== action.payload)],
    };
  case EDIT_ITEM:
    return {
      ...state,
      editor: action.payload.editor,
      idToEdit: action.payload.id,
    };
  case SAVE_EDIT:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload.expenses].sort((a, b) => { if (a.id > b.id); return minusOne; }),
      editor: action.payload.editor,
    };
  default:
    return state;
  }
};

export default wallet;
