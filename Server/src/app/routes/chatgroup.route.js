const router = require('express').Router();
const chatgroupCtrl = require('../controllers/chatgroup.controller');

router.get('/', function(req,res){
    res.json({
      status: true,
      data:[],
      message: 'Welcome to RESTful chat group API!',
    });
  });

/* CREATE CHAT GROUP */
router.route('/add').post(chatgroupCtrl.createChatGroup);

/* GET ALL CHAT GROUP */
router.route('/groups').get(chatgroupCtrl.getAllChatGroup);

/* GET SINGLE CHAT GROUP BY ID */
router.route('/:id').get(chatgroupCtrl.getChatGroupById);

/* UPDATE CHAT GROUP */
router.route('/update/:id').put(chatgroupCtrl.updateChatGroup);

/* DELETE CHAT GROUP */
router.route('/delete/:id').delete(chatgroupCtrl.deleteChatGroup);

module.exports = router;