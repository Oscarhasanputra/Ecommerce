const Sequelize = require("sequelize")
const db= require("../database/db")
const comments = db.define("comments",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    text:Sequelize.TEXT,
    user_id:Sequelize.TEXT,
    product_id:Sequelize.TEXT,
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE
},{
    freezeTableName:true,
}
)

module.exports=comments