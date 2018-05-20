import { SET_FILTER } from '../actions/types';

const initialState = { 
  filter: { 
    modality: {},
    minimunRate: 0
  }, 
};

const main = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER :
      return {
        ...state,
        filter: action.filter,
      }
    default:
      return state;
  }
}

export default main;