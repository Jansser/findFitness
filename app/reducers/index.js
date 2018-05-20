import { combineReducers } from 'redux';
import modalities from './modalities';
import professionals from './professionals';
import main from './main';

export default combineReducers({ 
  main,
  modalities,
  professionals 
});