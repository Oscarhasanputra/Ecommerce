const Sequelize = require("sequelize")
const db= require("../database/db")
const user = require("./user")
const product = db.define("product",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id : {
        type:Sequelize.INTEGER,
        references:{
            model: user,
            key:"user_id"
        }
    },
    name : Sequelize.STRING,
    description: Sequelize.TEXT,
    likes : Sequelize.INTEGER,
    category : Sequelize.STRING,
    price: Sequelize.DOUBLE,
    images: Sequelize.TEXT,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,

},{
    freezeTableName: true,
})

module.exports = product;