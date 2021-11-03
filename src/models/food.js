const Food = (sequelize, DataTypes) => sequelize.define('foods', {

    meat : {
      type: DataTypes.STRING,
      allowNull: false
    },
    vegetables: {
        type : DataTypes.STRING,
        allowNull: false
    },
    fruits:{
        type : DataTypes.STRING,
        allowNull: false
    }
  });
  
  module.exports = Food;