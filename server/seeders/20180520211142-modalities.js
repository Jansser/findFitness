'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      
    */
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      
    */
   return queryInterface.bulkDelete('Modalities', null, {});
  }
};
