'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserModalities = sequelize.define('UserModalities', 
  {
    userId: DataTypes.INTEGER
  },
  {
    modalityId: DataTypes.INTEGER
  }, {});
  UserModalities.associate = function(models) {
    // associations can be defined here
  };
  return UserModalities;
};