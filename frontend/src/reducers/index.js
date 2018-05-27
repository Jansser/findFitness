import { combineReducers } from 'redux';
import user from './user';
import schedule from './schedule';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({ 
  user,
  schedule,
  form: formReducer
});

