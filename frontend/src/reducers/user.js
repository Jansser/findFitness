import {
  AUTHENTICATE,
  LOGOUT,
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
    default:
      return state;
  }
}

export default user;