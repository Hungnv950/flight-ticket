import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  search: searchReducer,
});
