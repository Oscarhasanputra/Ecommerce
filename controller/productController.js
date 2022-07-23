const { user, products } = require("../model/index");
const multer = require("multer");
const path = require("path");
const { includes } = require("../webpack.config");
const { Sequelize, Op} = require("sequelize");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "public", "assets", "product"));
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    req.body.images = "product/" + fileName;

    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

const getAllProduct = async (req, res) => {
  const dataProduct = [];
  const {owner,filter,search} = req.query;
  const filterCategory = filter? filter:"createdAt,desc";
  const filterArray = filterCategory.split(",");
  try {
    const data = await products.findAll({
      
      order: [[filterArray[0], filterArray[1]]],
      where:{
        status:{
          [Op.ne]:"OFF"
        },
        owner:{
          [Op.ne]:owner?owner:""
        },
        name : {
          [Op.like]:"%" + (search? search :"") + "%"
        }
      }
    });

    //console.log(data);
    dataProduct.push(...data);
  } catch (error) {
    //console.log(error)
  }
  res.json(dataProduct);
};

const uploadFileHandler = async (req, res) => {
  const data = req.body;
  return res.status(200).json(data);
  
};
const getProductByOwner=async(req,res)=>{
  const {wallet} = req.query;
  //console.log("owner addres")
  //console.log(wallet)
  try {
    const data= await products.findAll({
      where:{owner:wallet}
    })
    res.status(200).json({data})
  } catch (error) {
    res.status(400)
  }
  
  
}
const getProduct = (req, res) => {
  const id = req.params.id;
  //console.log(id);
  products
    .findOne({
      where: {
        id,
      }
    })
    .then((modelProd) => {
      if (modelProd) {
        res.status(200).json(modelProd.dataValues);
      }
      res.status(404).json({ message: "Product Not Found" });
    })
    .catch((err) => {
      //console.log(err);

      res.status(404).json({ message: "Product Not Found" });
    });
};

const updateProduct= async(req,res)=>{
  const {id}= req.params;
  const {status}=req.body;
  try {
   await products.update({status},{where:{
      id
    }})
    const text = status=="ON"?"Published to the" : "Unpublished from "
    res.status(200).json({message:`Product Has Been ${text} Market`})
  } catch (error) {
    res.status(400).json({message:"Error Occured, Please Try Again"});
  }
}
const giveRating=async(req,res)=>{
  const {id}=req.params;
  try {
    const data=await products.findOne({where:{id}})
    
    data.rating +=1;
    await data.save()
    res.json({})
  } catch (error) {
    res.json({})
  }
}

const createProduct=async(req,res)=>{
  const {data} =req.body;
  //console.log(data)
  try {
      const dataProduct=await products.create(data);
      res.status(200).json({dataProduct});
  } catch (error) {
      //console.log(error)
      res.status(400)
  }
}

// const

module.exports = {
  getAllProduct,
  upload,
  uploadFileHandler,
  getProduct,
  giveRating,
  createProduct,
  updateProduct,
  getProductByOwner
};
