"use strict";
module.exports = function(sequelize, DataTypes) {
  var favourite = sequelize.define("favourite", {
    imdbId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    poster: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return favourite;
};