import {defineState} from 'redux-localstore';
import {
  AUTHENTICATE,
  LOGOUT,
  GET_MODALITIES,
  FETCH_PROFESSIONALS,
} from '../actions/types';

const defaulState = {
  isAuthenticated: false,
  user: null,
  token: '',
  professionals: []
};

const initialState = defineState(defaulState)('user');

const user = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        token: action.token
      };
    case LOGOUT:
      return defaulState;
    case GET_MODALITIES:
      return {
        ...state,
        modalities: action.modalities
      }
    case FETCH_PROFESSIONALS:
      return {
        ...state,
        professionals: action.professionals
      }
    default:
      return {
        ...state,
        professionals: []
      };
  }
}

export default user;