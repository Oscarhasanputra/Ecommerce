const { chat, roomChat } = require("../model");

const { Sequelize, Op } = require("sequelize");
const getContact = async () => {
  const address = "0xA96759a076c6780A991d4831300C79F7F504FE56"
  const user_target = "0xCdf717Cc766c2e924F9770CE52C43577baFEf70"
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
  console.log(data)
};
getContact();
