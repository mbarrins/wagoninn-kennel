const moment = require('moment');

const initialState = {
  year: moment().format('YYYY'),
  years: [],
  loading: false,
  errors: []
}

export default function incomeReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOADING_INCOME':

      return {
        ...state,
        loading: true
      }

    case 'LOAD_INCOME':

      return {
        ...state,
        ...action.payload,
        loading: false
      }

    case 'INCOME_ERRORS':

      return {
        ...state,
        errors: action.payload.errors
      }

    case 'CLEAR_INCOME':

      return initialState;

    default:

      return state;
  }
}