const Sequelize = require("sequelize")
const db= require("../database/db")
const cart = db.define("cart",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    user_id:Sequelize.TEXT,
    product_id:Sequelize.TEXT,
    owner_id:Sequelize.TEXT,
    status:{
        type:Sequelize.ENUM,
        values:['Waiting','Done'],
        defaultValue:"Waiting"
    },
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE
},{
    freezeTableName:true,
}
)

module.exports=cart