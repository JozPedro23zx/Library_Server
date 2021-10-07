const Sequelize = require('sequelize')
const database = require('../database/db')

const User_Book = database.define('user_book', {
    historicId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bookId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isUsing:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

module.exports = User_Book