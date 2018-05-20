import { 
  RECEIVE_MODALITIES 
} from './types';

import * as API from '../utils/api';

export const receiveModalities = (modalities) => {
  return {
    type: RECEIVE_MODALITIES,
    modalities: modalities
  };
}

export const fetchModalities = () => (dispatch) =>
  API.fetchModalities().then(data =>
    dispatch( receiveModalities(data.modalities) )
  );