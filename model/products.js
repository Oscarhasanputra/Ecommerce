const Sequelize = require("sequelize")
const db= require("../database/db")
const user = require("./user")
const products = db.define("products",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:Sequelize.STRING,
    owner:Sequelize.TEXT,
    category:Sequelize.STRING,
    rating : Sequelize.INTEGER,
    price: Sequelize.INTEGER,
    status:{
        type:Sequelize.ENUM,
        values:['ON','OFF'],
        defaultValue:"ON"
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,

},{
    freezeTableName: true,
})

module.exports = products;