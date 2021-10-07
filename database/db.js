const dotenv = require('dotenv')
const Sequelize = require('sequelize');

const result = dotenv.config({path: '../.env'})

if(result.error) console.log(result.error)
 

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mysql',
    host: process.env.DB_HOST
});

module.exports = sequelize;