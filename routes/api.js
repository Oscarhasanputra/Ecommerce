var express = require('express');
var router = express.Router();
const User = require("../controller/userController")
const Product =require("../controller/productController")
const Order = require("../controller/orderController")
const Cart = require("../controller/cartController")
const Comment = require("../controller/commentController")
const multer = require("multer");
/* GET home page. */
router.get("/myorder",Order.getMyOrder);
router.get("/myorder/all",Order.getAllMyOrderDetail);

router.get("/myorder/notif",Order.getAllMyOrderNotif);
router.get("/products",Product.getAllProduct)
router.get("/products/owner",Product.getProductByOwner)
router.get("/product/:id",Product.getProduct)
router.get("/order/:id",Order.getDetailOrder)
router.get("/comments",Comment.getComment)
router.post("/product",Product.createProduct)
router.post("/order/confirm",Order.updateOrder)
router.post("/orderDetail/read",Order.updateReadOrderDetail)
router.post("/product/checkout",Order.checkoutOrder)
router.post("/product/:id",Product.giveRating)
router.put("/products/:id",Product.updateProduct)
router.post("/uploadfiles",(req,res,next)=>{
    Product.upload.single("file")(req,res,(err)=>{
        if (err instanceof multer.MulterError) {
            //console.log("error multer")
            //console.log(err)
            return res.send(500);
            // A Multer error occurred when uploading.
        } else if (err) {
            //console.log("error not multer")
            //console.log(err)
            return res.send(500)
            // An unknown error occurred when uploading.
        }
        // Everything went fine. 
        next()
    })
}
    ,Product.uploadFileHandler)
router.post("/user/upload",User.upload.single("file"),User.uploadFileHandler)
router.post("/cart",Cart.addCartItem)
router.post("/comments",Comment.addComments)
router.get("/cart/:wallet",Cart.getCartByWallet)
router.delete("/cart",Cart.deleteCartItem)

module.exports = router;