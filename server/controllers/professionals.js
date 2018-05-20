const defaultData = {
  professionals: [
    {
      id: 1,
      name: 'Jansser',
      rate: 5,
      sexo: 'M',
      modalities: [1, 2, 4, 8]
    },
    {
      id: 2,
      name: 'George',  
      rate: 3,
      sexo: 'F',
      modalities: [1]
    },
    {
      id: 3,
      name: 'Fulana',
      rate: 2,
      sexo: 'F',
      modalities: [5]
    },
    {
      id: 4,
      sexo: 'M',
      name: 'Clark kent',
      rate: 4,
      modalities: [5, 8, 1, 6, 7, 12]
    },
    
  ]
}

module.exports = {
  search(filter) {
    return new Promise((res) => {
      res({ professionals: defaultData.professionals.filter(professional => professional.modalities.includes(parseInt(filter.modality)))});
    });
  },
};
