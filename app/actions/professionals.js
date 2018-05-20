import { 
  RECEIVE_PROFESSIONALS 
} from './types';

import * as API from '../utils/api';

export const receiveProfessionals = (professionals) => {
  return {
    type: RECEIVE_PROFESSIONALS,
    professionals
  };
}

export const searchProfessionals = (filter) => (dispatch) =>
  API.searchProfessionals(filter).then(data =>
    dispatch(receiveProfessionals(data.professionals))
  );