'use strict';

require('pg').types.setTypeParser(1114, stringValue => {
  return new Date(stringValue + '+0000');
});

module.exports = (sequelize, DataTypes) => {
  var Schedule = sequelize.define('Schedule', {
    userId: DataTypes.INTEGER,
    professionalId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    status: {
      allowNull: false,
      defaultValue: 'Solicitado',
      type: DataTypes.ENUM('Solicitado', 'Confirmado', 'Cancelado')
    }
  }, {});
  Schedule.associate = function(models) {
    Schedule.belongsTo(models.User, {as: 'user' });
    Schedule.belongsTo(models.User, {as: 'professional'});
  };
  
  return Schedule;
};