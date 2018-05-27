import {
  FETCH_SCHEDULES,
} from '../actions/types';

const initialState = {
  schedules: []
};

const schedule = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SCHEDULES:
      return {
        ...state,
        schedules: action.schedules
      };
    default:
      return state;
  }
}

export default schedule;