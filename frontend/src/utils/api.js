export const SERVER_STATIC_IMAGE_URL = `https://find-fitness.herokuapp.com/`;
export const SERVER_URL = `https://find-fitness.herokuapp.com/api`;

const options    = { 
  headers: { 
    Authorization: 'whatever-you-want', 
    'Content-Type': 'application/json' 
  } 
};

export const createProfessional = (values) => {
  
  return fetch(`${SERVER_URL}/professional`, { 
    method: 'post',
    body: values
  }).then(response => response.json());
}

export const getProfessional = (params) => {
  let query = `?id=${params.id}`;
  return fetch(`${SERVER_URL}/professional${query}`, options).then(response => response.json());
}

export const createSchedule = (values) => {
  return fetch(`${SERVER_URL}/schedule`, { 
    ...options,
    method: 'post',
    body: JSON.stringify(values)
  }).then(response => response.json());
}

export const loginProfessional = (data) => {
  return fetch(`${SERVER_URL}/auth/local`, { 
    ...options,
    method: 'post',
    body: JSON.stringify(data)
  }).then(response => response.json());
}

export const getModalities = () => {
  return fetch(`${SERVER_URL}/modalities`, options).then(response => response.json());
}

export const getProfessionals = (params) => {
  let query = `?modality=${params.modality}`;
  return fetch(`${SERVER_URL}/users${query}`, options).then(response => response.json());
}

export const getSchedules = (params) => {
  let id = params.professionalId ? `professionalId=${params.professionalId}` : `userId=${params.userId}`;
  let query = `?${id}&status=${params.status}`;
  
  return fetch(`${SERVER_URL}/schedule${query}`, options).then(response => response.json());
}

export const getLastSchedule = (params) => {
  let query = `?userId=${params.userId}`;
  
  return fetch(`${SERVER_URL}/schedule/user${query}`, options).then(response => response.json());
}

export const updateSchedule = (id, status) => {
  return fetch(`${SERVER_URL}/schedule`, { 
    ...options,
    method: 'put',
    body: JSON.stringify({ id: id, status: status })
  }).then(response => response.json());
}

export const createReview = (values) => {
  return fetch(`${SERVER_URL}/review`, { 
    ...options,
    method: 'post',
    body: JSON.stringify(values)
  }).then(response => response.json());
}
