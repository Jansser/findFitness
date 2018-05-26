'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
			'Users',
			'description',
			Sequelize.TEXT
    );
    
    queryInterface.addColumn(
			'Users',
			'CREF',
			Sequelize.TEXT
		);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
