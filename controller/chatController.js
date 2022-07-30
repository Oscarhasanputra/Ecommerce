const { chat, roomChat } = require("../model");
const { Sequelize, Op } = require("sequelize");
const getChatUser = async (req, res) => {
  const { id } = req.params;
  const data = await roomChat.findOne({
    where: {
      id,
    },
    include: [
      {
        model: chat,
      },
    ],
  });
  chat.update({readStatus:"1"},{where:{
    room_id:id
  }});
  res.status(200).json(data);
};
const getContact = async (req, res) => {
  const { user_id } = req.params;

  const data = await roomChat.findAll({
    where: {
      user_id: {
        [Op.like]: "%" + user_id + "%",
      },
    },
    include: [
      { model: chat, order: [["id", "DESC"]], limit: 1 },
      {
        model: chat,
        as: "newChats",
        required: false,
        where: {
          user_target: {
            [Op.like]: "%" + user_id + "%",
          },
          readStatus: "0",
        },
      },
    ],
    order:[["updatedAt","desc"]]
  });
  res.status(200).json(data);
};

const createChat = async (req, res) => {
  const data = req.body;

  chat.create(data);
  const date = new Date();
  
  roomChat.findOne({where:{
    id:data.room_id
  }}).then((room)=>{
    room.changed("updatedAt",true)
    room.updatedAt = date;
    room.save()
  })

};

const checkRoomChat = async(req,res)=>{
  const {address, user_target} = req.body;
  let data = await roomChat.findOne({where:{
    [Op.or]:[{user_id:{
      [Op.like]:"%"+address+","+user_target+",%"
    }},{
      user_id:{
        [Op.like]:"%"+user_target+","+address+",%"
      }
    }]
  }})
  if(!data){
    data =await roomChat.create({
      user_id:address+","+user_target+",",
    })
  }

  res.status(200).json(data);
}
module.exports = {
  getChatUser,
  createChat,
  getContact,
  checkRoomChat
};
