import { 
  RECEIVE_MODALITIES, 
} from '../actions/types';

const modalities = (state = { modalities: []}, action) => {
  switch (action.type) {
    case RECEIVE_MODALITIES:
      return {
        ...state,
        modalities: action.modalities
      }
    default:
      return state;
  }
};

export default modalities;