'use strict';

require('dotenv').config();

// Connects to our database depending on the URI as an environmental variable
const POSTGRES_URI =   process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : postgres://ekfpjakerznqsz:a726e200755b66c280c1ca487eac5e896135eab9d58cd9dd0650e070f2f8d433@ec2-52-54-237-144.compute-1.amazonaws.com:5432/dcj1dnb5uifaq

 

// require both the Sequelize and Datatype  constructor from the sequelize package
const { Sequelize, DataTypes } = require('sequelize');

// We will configure our connection options for production

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

// our connection object
// we are going to use this to connect to Postgres
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const clothes = require('./clothes');
const food =require('./food');

const customerModel = food(sequelize, DataTypes);
 const orderModel = clothes(sequelize, DataTypes);


const Collection = require('./collection-class');



   const foodCollection = new Collection(customerModel);
    const clothesCollection = new Collection(orderModel);


module.exports = {
  db: sequelize,
  // Clothes: clothes(sequelize, DataTypes), // this step is used to create a new table
  // Food: food(sequelize, DataTypes)
  clothesCollection: clothesCollection,
  foodCollection: foodCollection

};
