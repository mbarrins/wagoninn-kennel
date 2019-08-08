import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import lookupsReducer from './lookups_reducer';

export default combineReducers({
  users: usersReducer,
  lookups: lookupsReducer
});