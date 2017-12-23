import { combineReducers } from 'redux'
import { appointmentReducer } from './appointment'
import { apiReducer } from './api'
// import { reducer as formReducer } from 'redux-form'

export const reducers = combineReducers({
  appointment: appointmentReducer,
  remoteData: apiReducer
  // form: formReducer
})