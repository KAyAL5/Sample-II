const router = require('express').Router();

const chatCtrl = require('../controllers/chat.controller');

router.get('/', function(req,res){
    res.json({
      status: 'Chat API Its Working',
      message: 'Welcome to RESTful Chat API!',
    });
  });

  router.route('/message').post(chatCtrl.chatMessage);

  router.route('/getuser').post(chatCtrl.getuser);
  router.route('/listemessagesuser').post(chatCtrl.listemessagesuser);
  router.route('/envoimessageuser').post(chatCtrl.envoimessageuser);
  router.route('/listemessagesroom').post(chatCtrl.listemessagesroom);
  router.route('/envoifileuser').post(chatCtrl.envoifileuser);
  router.route('/onUploadfile').post(chatCtrl.onUploadfile);
  router.route('/showfile').post(chatCtrl.showfile);

  router.route('/listemessagesgroup').post(chatCtrl.listemessagesgroup);
  

// Export API routes
module.exports = router;