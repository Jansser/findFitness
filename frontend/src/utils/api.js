const SERVER_URL = `http://localhost:3001`;
const options    = { 
  headers: { 
    Authorization: 'whatever-you-want', 
    'Content-Type': 'application/json' 
  } 
};

export const createProfessional = (values) => {
  return fetch(`${SERVER_URL}/professional`, { 
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

  console.log(`${SERVER_URL}/users${query}`);

  return fetch(`${SERVER_URL}/users${query}`, options).then(response => response.json());
}