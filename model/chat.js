const Sequelize = require("sequelize")
const db= require("../database/db")
const chat = db.define("chat",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    room_id:Sequelize.INTEGER,
    message:Sequelize.TEXT,
    user_target:Sequelize.TEXT,
    readStatus:{
        type:Sequelize.ENUM,
        values:['0','1'],
        defaultValue:"0"
    },
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE
},{
    freezeTableName:true,
}
)

module.exports=chat