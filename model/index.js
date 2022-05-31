const user = require("./user")
const product = require("./product")
const order = require("./order")
const orderDetail = require("./orderDetail")
const cart = require("./cart")
const products= require("./products")
const comments= require("./comments")

user.hasOne(product,{foreignKey:"user_id"});
product.belongsTo(user,{foreignKey:"user_id"});

user.hasMany(order,{foreignKey:"buyer_id",as:"myorder"})
user.hasMany(order,{foreignKey:"seller_id",as:"mysell"})

order.belongsTo(products,{foreignKey:"product_id"});
order.belongsTo(user,{foreignKey:"seller_id",as:"user"})
order.belongsTo(user,{foreignKey:"seller_id",as:"seller"})
order.belongsTo(user,{foreignKey:"buyer_id",as:"buyer"})

order.hasMany(orderDetail,{foreignKey:"orders_id"})
orderDetail.belongsTo(order,{foreignKey:"orders_id"})
// order.belongsToMany(user,{through:"buyer",foreignKey:"buyer_id"})

module.exports={user, product,order,orderDetail,cart,products,comments}