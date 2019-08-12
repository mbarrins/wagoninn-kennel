import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import lookupsReducer from './lookups_reducer';
import ownerReducer from './owner_reducer';
import petReducer from './pet_reducer';
import bookingReducer from './booking_reducer';
import availabilityReducer from './availability_reducer';
import dashboardReducer from './dashboard_reducer';

const appReducer = combineReducers({
  users: usersReducer,
  lookups: lookupsReducer,
  owner: ownerReducer,
  pet: petReducer,
  booking: bookingReducer,
  availability: availabilityReducer,
  dashboard: dashboardReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;