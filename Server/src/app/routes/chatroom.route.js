const router = require('express').Router();

const chatRoomCtrl = require('../controllers/chatroom.controller');

router.get('/', function(req,res){
    res.json({
      status: 'Chat Room API Its Working',
      message: 'Welcome to RESTful Chat Room API!',
    });
  });

  router.route('/message').post(chatRoomCtrl.message);
  router.route('/getmessage').get(chatRoomCtrl.getmessage);
  router.route('/getallmessage').get(chatRoomCtrl.getallmessage);
  router.route('/updateroommessage').put(chatRoomCtrl.updateroommessage);
  router.route('/deleteroommessage').delete(chatRoomCtrl.deleteroommessage);
  
// Export API routes
module.exports = router;