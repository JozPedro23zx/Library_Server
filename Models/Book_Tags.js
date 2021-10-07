const Sequelize = require('sequelize')
const database = require('../database/db')

const Book_Tag = database.define('book_tag', {
    book:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    genre:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    }
})

module.exports = Book_Tag