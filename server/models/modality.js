'use strict';

module.exports = (sequelize, DataTypes) => {
  var Modality = sequelize.define('Modality', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    active: { 
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN, 
    }
  });
  
  Modality.associate = function(models) {
    Modality.belongsToMany(models.User, { 
      through: 'UserModalities',
      as: 'users',
      foreignKey: 'modalityId'
    });
  };

  return Modality;
};