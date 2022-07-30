const Sequelize = require("sequelize")
const db= require("../database/db")
const roomChat = db.define("room_chat",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    user_id:Sequelize.TEXT,
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE
},{
    freezeTableName:true,
}
)

module.exports=roomChat