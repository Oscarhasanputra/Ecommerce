const {Sequelize} = require("sequelize")
const db= require("../database/db")
const product = require("./product")
const user= db.define("user",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.STRING,
    name: Sequelize.STRING,
    password: Sequelize.TEXT,
    email : Sequelize.STRING,
    saldo : Sequelize.DOUBLE,
},{
    timestamps: false,
    freezeTableName:true,
})
module.exports= user;