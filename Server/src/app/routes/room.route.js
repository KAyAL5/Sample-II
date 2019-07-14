const router = require('express').Router();
const roomCtrl = require('../controllers/room.controller');

router.get('/', function(req,res){
    res.json({
      status: 'Room API Its Working',
      message: 'Welcome to RESTful Room API!',
    });
  });

  // Create a new user
router.route('/add').post(roomCtrl.createRoom);

/* GET ALL ROOMS */
router.route('/rooms').get(roomCtrl.getAllRooms);

/* GET SINGLE ROOM BY ID */
router.route('/:id').get(roomCtrl.getRoomById);

/* UPDATE ROOM */
router.route('/update/:id').put(roomCtrl.updateRoom);

/* DELETE ROOM */
router.route('/delete/:id').delete(roomCtrl.deleteRoom);

module.exports = router;