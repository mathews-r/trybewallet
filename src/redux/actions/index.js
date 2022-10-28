import fetchAPI from '../../services/walletAPI';

export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_WALLET = 'ADD_WALLET';
export const ADD_FORM = 'ADD_FORM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const SAVE_EDIT = 'SAVE_EDIT';

export const addEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const addWallet = (payload) => ({
  type: ADD_WALLET,
  payload,
});

export const addForm = (payload) => ({
  type: ADD_FORM,
  payload,
});

export const deleteItem = (payload) => ({
  type: DELETE_ITEM,
  payload,
});

export const editItem = (payload) => ({
  type: EDIT_ITEM,
  payload,
});

export const saveEdit = (payload) => ({
  type: SAVE_EDIT,
  payload,
});

export function fetchAPIThunk() {
  return async (dispatch) => {
    try {
      const response = await fetchAPI();
      const values = Object.keys(response).filter((coin) => coin !== 'USDT');
      dispatch(addWallet(values));
    } catch (error) {
      console.log(error);
    }
  };
}
