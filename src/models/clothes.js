'use strict';

const Clothes = (sequelize, DataTypes) => sequelize.define('clothes', {

  dresses: {
    type: DataTypes.STRING,
    allowNull: false
  },
  scarves: {
      type : DataTypes.STRING,
      allowNull: false
  },
  coats:{
      type : DataTypes.STRING,
      allowNull: false
  },
  shoes : {
      type : DataTypes.STRING,
      allowNull: false
  }
});

module.exports = Clothes;