import { combineReducers } from 'redux';
import modalities from './modalities';
import professionals from './professionals';
import main from './main';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({ 
  main,
  modalities,
  professionals,
  form: formReducer 
});