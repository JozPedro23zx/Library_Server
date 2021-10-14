const dotenv = require('dotenv')
const Sequelize = require('sequelize');

const result = dotenv.config({path: '../.env'})

if(result.error) console.log(result.error)
 

const sequelize = new Sequelize(process.env.DATABASE_URL);

module.exports = sequelize;