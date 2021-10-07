const Sequelize = require("sequelize");
const database = require('../database/db')

const Group = database.define('group', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cover: Sequelize.STRING
})

module.exports = Group