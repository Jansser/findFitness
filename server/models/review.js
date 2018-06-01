'use strict';
module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define('Review', {
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    professionalId: DataTypes.INTEGER,
    rate: DataTypes.INTEGER
  }, {});

  Review.associate = function(models) {
    Review.belongsTo(models.User, {as: 'user' });
    Review.belongsTo(models.User, {as: 'professional'});
  };

  return Review;
};