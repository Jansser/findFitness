import {
  SET_FILTER 
} from './types';

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    filter,
  }
}