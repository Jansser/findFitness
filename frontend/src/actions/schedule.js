import { 
  FETCH_SCHEDULES
} from './types';

export const fetchSchedulesSuccess = (data) => {
  return {
      type: FETCH_SCHEDULES,
      schedules: data
  };
}
