import { 
  AUTHENTICATE,
  LOGOUT,
  CREATE_PROFESSIONAL_SUCCESS,
  CREATE_PROFESSIONAL_ERROR,
  GET_MODALITIES,
  FETCH_PROFESSIONALS
} from './types';

/**
 * 
 * AUTHENTICATE
 */
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

/**
 * 
 * CREATE_PROFESSINAL
 */
export const createProfessionalSuccess = (data) => {
  return {
      type: CREATE_PROFESSIONAL_SUCCESS,
      professional: data
  };
}

export const createProfessionalError = (data) => {
  return {
      type: CREATE_PROFESSIONAL_ERROR,
      professional: data
  };
}

export const createProfessional = (data, callback) => (dispatch) => {
  console.log('Data', data);
  callback();
  dispatch(createProfessionalSuccess(data))
  
  /* API.createPost(data).then(data => {
    callback();
    dispatch(createPostSuccess(data))
  }); */
};
  
/**
 * 
 * 
 */
export const getModalitiesSuccess = (data) => {
  return {
    type: GET_MODALITIES,
    modalities: data.modalities
  }
}

export const fetchProfessionalsSuccess = (data) => {
  return {
    type: FETCH_PROFESSIONALS,
    professionals: data
  }
}