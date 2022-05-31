let {Sequelize} = require("sequelize")
let db= new Sequelize("marketplace","root","root",{
    dialect:"mysql",
    host:"localhost",
    logging:console.log
})

module.exports= db;