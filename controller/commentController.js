const {comments} = require("../model")

const addComments=async(req,res)=>{
    const {data} = req.body;
    try {
        
        await comments.create(data);
        res.status(200)
            .json({
                message:"Published the Comment"
            })
    } catch (error) {
        res.status(400)
            .json({
                message:"Error Occured when Publishing Comment"
            })
    }

}

const getComment=async(req,res)=>{
    const {product_id} = req.query;
    //console.log(product_id)
    try {
        const dataComments= await comments.findAll({where:{product_id}})
        res.status(200)
            .json({data:dataComments})
    } catch (error) {
        res.status(404);
    }
}

module.exports={
    addComments,
    getComment
}