'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Modalities', [{
      name: 'Alongamento',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Artes Marciais',  
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Ciclismo',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Corrida',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Crossfit',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      name: 'Dança',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'HiiT',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Musculação',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Natação',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      name: 'Pilates',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Treino Funcional',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Triathlon',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Yoga',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Modalities', null, {});
  }
};
