var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/",(req,res,next)=>{
 
  let state={}
  if(req.session.Login)
    state={isLogin:true, data:req.session.data}
  console.log(state);
  return res.render("index",{state: JSON.stringify(state)})

})
router.get('/:id', function(req, res, next) {
  let state={}
  if(req.session.Login)
    state={isLogin:true, data:req.session.data}
  
  return res.render("index",{state: JSON.stringify(state)})
  
});

module.exports = router;
