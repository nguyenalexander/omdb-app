"use strict";
module.exports = function(sequelize, DataTypes) {
  var user_globalfavourite = sequelize.define("user_globalfavourite", {
    user_id: DataTypes.INTEGER,
    globalfavourite_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_globalfavourite;
};