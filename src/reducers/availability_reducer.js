import moment from 'moment'

const initialState = {
  month: moment().format('MM'),
  year: moment().format('YYYY'),
  dates: [],
  pens_available: [],
  loading: false,
  errors: []
}

export default function availabilityReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOADING_AVAILABILITY':

      return {
        ...state,
        loading: true
      }

    case 'LOAD_AVAILABILITY':

      return {
        ...state,
        ...action.payload,
        loading: false
      }

    case 'UPDATE_AVAILABILITY':
      return {
        ...state,
        ...action.payload
      }

    case 'AVAILABILITY_ERRORS':

      return {
        ...state,
        errors: action.payload.errors
      }

    case 'CLEAR_AVAILABILITY':

      return initialState;

    default:

      return state;
  }
}