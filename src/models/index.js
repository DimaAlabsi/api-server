'use strict';

require('dotenv').config();

// Connects to our database depending on the URI as an environmental variable
const POSTGRES_URI =   process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.HEROKU_POSTGRESQL_GREEN_URL  || process.env.DATABASE_URL ;

 

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
