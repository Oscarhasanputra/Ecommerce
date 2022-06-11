const Sequelize = require("sequelize")
const db= require("../database/db")

const orderDetail = db.define("orders_detail",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    orders_id:Sequelize.INTEGER,
    status : Sequelize.STRING,
    gas: Sequelize.DOUBLE,
    createdAt: Sequelize.DATE,
    updatedAt:Sequelize.DATE,
    readStatus:Sequelize.TEXT,
    txid:Sequelize.TEXT
},{
    freezeTableName:true,
}
)
module.exports=orderDetail