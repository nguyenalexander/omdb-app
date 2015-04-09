"use strict";
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define("comment", {
    commentBody: DataTypes.TEXT,
    favouriteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.comment.belongsTo(models.globalfavourite),
        models.comment.belongsTo(models.user)
      }
    }
  });
  return comment;
};