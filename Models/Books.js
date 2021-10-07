const Sequelize = require("sequelize");
const database = require('../database/db')

const Book = database.define('book', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    author: Sequelize.STRING,

    sinopse: Sequelize.TEXT,

    quantity: Sequelize.INTEGER,

    cover: Sequelize.STRING,

    newAdd: Sequelize.DATE,

    groupId: Sequelize.INTEGER,

    libraryId: Sequelize.INTEGER
})



module.exports = Book