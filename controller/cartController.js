const {cart} = require("../model")

const getCartByWallet=async(req,res)=>{
    const {wallet}=req.params;
    const cartData=await cart.findAll({where:{user_id:wallet}})
    res.status(200)
        .json(cartData);
}
const addCartItem=async(req,res)=>{
    const {data}=req.body;
    try {
    console.log(data)
    const cartData=await cart.create(data)
    res
        .status(200)
        .json({cartItem:cartData, message: "Item has been Added to Cart List" });
    } catch (error) {
        res
        .status(400)
        .json({ message: "Error Occured when Adding Item to Cart List" });
    }
}

const deleteCartItem=async(req,res)=>{
    const data = req.body;
    try {
        
        await cart.destroy({where:{id:data}});
        return res.status(200).json({message:"Item has been Deleted from Cart List"});
    } catch (error) {
        res
        .status(400)
        .json({ message: "Error Occured when Delete Item from Cart List" });
    }

}
module.exports={
    getCartByWallet,
    addCartItem,
    deleteCartItem
}