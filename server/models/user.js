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
    },
    isProfessional: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN, 
    },

    password_digest: {
      type: DataTypes.STRING,
    },

    password: {
      type: DataTypes.VIRTUAL,
    },

    description: {
      type: DataTypes.TEXT
    },

    CREF: {
      type: DataTypes.STRING
    },

    facebook_id: {
      type: DataTypes.TEXT
    }
  }, {
    instanceMethods: {
      authenticate: function(value) {
        if (bcrypt.compareSync(value, this.password_digest))
          return this;
        else
          return false;
      }
    }
  });
  
  User.associate = function(models) {
    User.belongsToMany(models.Modality,{ 
      through: 'UserModalities',
      as: 'modalities',
      foreignKey: 'userId'
    });
  };
  
  return User;
};