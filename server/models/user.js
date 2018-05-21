'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    active: { 
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN, 
    }
  }, {});

  User.associate = function(models) {
    // associations can be defined here
  };
  
  return User;
};