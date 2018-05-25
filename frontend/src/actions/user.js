import { 
  AUTHENTICATE,
  LOGOUT
} from './types';

export const authenticate = (user, token) => {
  return {
    type: AUTHENTICATE,
    user,
    token
  };
}

export const logout = () => {
  return {
    type: LOGOUT
  };
}