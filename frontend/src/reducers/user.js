import {
  AUTHENTICATE,
  LOGOUT,
  GET_MODALITIES,
  FETCH_PROFESSIONALS,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: '',
  professionals: []
};

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
      return initialState;
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
      return state;
  }
}

export default user;