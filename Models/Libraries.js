const Sequelize = require("sequelize");
const database = require('../database/db')

const Library = database.define('library', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    street: {
        type: Sequelize.STRING,
        allowNull: false
    },

    location: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Library