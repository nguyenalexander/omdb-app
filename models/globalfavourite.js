"use strict";
module.exports = function(sequelize, DataTypes) {
  var globalfavourite = sequelize.define("globalfavourite", {
    imdbId: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    poster: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.globalfavourite.belongsToMany(models.user, {through: 'user_globalfavourite', foreignKey: 'globalfavourite_id'}),
        models.globalfavourite.hasMany(models.comment, {onDelete: 'CASCADE'})
      }
    }
  });
  return globalfavourite;
};