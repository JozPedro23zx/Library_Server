const Sequelize = require('sequelize')
const database = require('../database/db')

const User = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    age:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    location:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    isAdmin:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

module.exports = User