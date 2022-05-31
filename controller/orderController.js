const { order, user, orderDetail, products, cart } = require("../model/index");
const { Sequelize, Op } = require("sequelize");

const checkoutOrder = async (req, res) => {
  const data = req.body;
  // console.log(data)
  try {
    // orderDetail.bulkCreate()
    const orderData = await order.bulkCreate(data);
    const orderDetailData = orderData.map((order, index) => {
      return {
        orders_id: order.getDataValue("id"),
        status: order.getDataValue("status"),
        gas: data[index].gas,
      };
    });
    // const values = orderData.dataValues;
    await orderDetail.bulkCreate(orderDetailData);
    // await orderDetail.create({ orders_id: values.id, status: values.status });
    return res.status(200).json({
      message:
        "Checkout the Product has Completed, Waiting for the Response from Seller",
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Found a Mistake While you were Checkout" });
  }
};
const updateOrder = async (req, res) => {
  const data = req.body;
  try {
    const orderData = await order.findOne({ where: { id: data.id } });

    orderData.status = data.status;

    const save = await orderData.save();
    await orderDetail.create({
      orders_id: data.id,
      status: data.status,
      gas: data.gas ? data.gas : 0,
    });

    if (save.getDataValue("status") == "Confirmation")
      return res
        .status(200)
        .json({ message: "Order Confirmation has been sent to buyer" });
    else if (save.getDataValue("status") == "Finished")
      return res
        .status(200)
        .json({ message: "Feedback Has been sent to Seller" });
    else if (save.getDataValue("status") == "Claimed")
      return res.status(200).json({
        message: "You are successfully Claiming Fee into Your Wallet",
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: " Found Mistake while you send Response" });
  }
};

const getDetailOrder = async (req, res) => {
  const { id } = req.params;

  const { user_id } = req.query;
  try {
    const orderData = await order.findAll({
      where: {
        [Op.or]: [{ buyer_id: user_id }, { seller_id: user_id }],
        [Op.and]: [{ id }],
      },
      include: [{ model: orderDetail }, { model: products }],
    });
    // const data = await user.findOne({
    //   where: { id: user_id },
    //   include: [
    //     {
    //       model: order,
    //       as: "myorder",
    //       on: [
    //         Sequelize.or(
    //           {
    //             buyer_id: user_id,
    //           },
    //           { seller_id: user_id }
    //         ),
    //         { id },
    //       ],
    //       required: true,
    //       include: [
    //         { model: product },
    //         { model: user, as: "seller" },
    //         { model: user, as: "buyer" },
    //         { model: orderDetail },
    //       ],
    //     },
    //   ],
    // });
    console.log("working");
    console.log(orderData);
    res.json(orderData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Unauthorized User" });
  }
};

const getAllMyOrderDetail = async (req, res) => {
  const { user_id } = req.query;

  try {
    const orderData = await order.findAll({
      attributes: ["id"],
      where: {
        [Op.or]: [{ buyer_id: user_id }, { seller_id: user_id }],
      },
    });
    const orderIds = orderData.map((val, index) => val.id);
    const orderDetailData = await orderDetail.findAll({
      where: { orders_id: orderIds },
      order: [["id", "DESC"]],
      include: [{ model: order, as: "order" }],
    });
    order.update()
    res.json(orderDetailData);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

const getAllMyOrderNotif = async (req, res) => {
  const { user_id } = req.query;

  try {
    const orderData = await order.findAll({
      attributes: ["id"],
      where: {
        [Op.or]: [{ buyer_id: user_id }, { seller_id: user_id }],
      },
    });
    const orderIds = orderData.map((val, index) => val.id);
    console.log("notification mine")
    console.log(orderIds);
    console.log(user_id)
    const orderDetailData = await orderDetail.findAll({
      where: {
        orders_id: orderIds,

        readStatus: {
          [Op.or]:[{

            [Op.notLike]: "%" + user_id + "%",
          },{
            [Op.ne] : null
          }]
        },
      },
      order: [["id", "DESC"]],
      include: [{ model: order, as: "order" }],
    });
    console.log(orderDetailData)
    res.json(orderDetailData);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

const getMyOrder = async (req, res) => {
  const { user_id } = req.query;
  try {
    const myOrder = await order.findAll({ where: { buyer_id: user_id } });
    const mySelling = await order.findAll({ where: { seller_id: user_id } });
    // const data= await user.findOne({where:{id:user_id},
    //     include:[{model:order,as:"myorder",include:[{model:product},{model:user,as:"seller"}]},{model:order,as:"mysell",include:[{model:product},{model:user,as:"buyer"}]},
    //     ]
    // })

    res.json({ myOrder, mySelling });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "not found order" });
  }
};

const updateReadOrderDetail = async (req, res) => {
  
  const {data} =req.body;
  try {
    console.log(data)
    data.map((orderdet,index)=>{
        orderDetail.update({readStatus:orderdet.readStatus},{
          where:{id:orderdet.id}
        })
    })
    res.status(200)
    // res.json(orderDetailData);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

module.exports = {
  checkoutOrder,
  updateOrder,
  getDetailOrder,
  getMyOrder,
  getAllMyOrderDetail,
  getAllMyOrderNotif,
  updateReadOrderDetail
};
