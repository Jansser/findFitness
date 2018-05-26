import {
  AUTHENTICATE,
  LOGOUT,
  GET_MODALITIES,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: ''
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        isAuthenticated: true,
        user: action.user,
        token: action.token
      };
    case LOGOUT:
      return initialState;
    case GET_MODALITIES:
      return {
        ...state,
        modalities: action.modalities
      }
    default:
      return state;
  }
}

export default user;