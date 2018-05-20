import { 
  RECEIVE_PROFESSIONALS, 
} from '../actions/types';

const professionals = (state = { professionals: []}, action) => {
  if(action.type === RECEIVE_PROFESSIONALS) {
    console.log('RECEIVE_PROFESSIONALS', action.professionals);
  }
  
  switch (action.type) {
    case RECEIVE_PROFESSIONALS:
      return {
        ...state,
        professionals: action.professionals
      }
    default:
      return state;
  }
};

export default professionals;