"use strict";
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.user.hasMany(models.comment, {onDelete: 'SET NULL'}),
        models.user.hasMany(models.favourite, {onUpdate: 'CASCADE', onDelete: 'CASCADE'}),
        models.user.belongsToMany(models.globalfavourite, {through: 'user_globalfavourites', foreignKey: 'user_id'})
      }
    }
  });
  return user;
};