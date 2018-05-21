const SERVER_URL = `http://192.168.1.4:3001`;

const options    = { 
  headers: { 
    Authorization: 'whatever-you-want', 
    'Content-Type': 'application/json' 
  } 
};

export const fetchModalities = () => {
  return fetch(`${SERVER_URL}/modalities`, options).then(response => response.json());
}

export const searchProfessionals = (filter) => {
  let body = {
    modality: filter.modality.id
  }
  
  return fetch(`${SERVER_URL}/professionals/search`, { 
    ...options,
    method: 'post',
    body: JSON.stringify(body)
  }).then(response => response.json());
}