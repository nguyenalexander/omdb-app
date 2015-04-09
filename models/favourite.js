"use strict";
module.exports = function(sequelize, DataTypes) {
  var favourite = sequelize.define("favourite", {
    imdbId: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    poster: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.favourite.belongsTo(models.user)
      }
    }
  });
  return favourite;
};