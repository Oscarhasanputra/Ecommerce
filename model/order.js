const Sequelize = require("sequelize")
const db= require("../database/db")
const order = db.define("orders",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    buyer_id:Sequelize.TEXT,
    seller_id:Sequelize.TEXT,
    product_id:Sequelize.TEXT,
    email : Sequelize.STRING,
    status:{
        type:Sequelize.ENUM,
        values:['Waiting','Confirmation','Finished',"Claimed","Refund"],
        defaultValue:"Waiting"
    },
    price: Sequelize.DOUBLE,
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE
},{
    freezeTableName:true,
}
)

module.exports=order