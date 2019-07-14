const router = require('express').Router();

const userCtrl = require('../controllers/user.controller');

router.get('/', function(req,res){
    res.json({
      status: 'User API Its Working',
      message: 'Welcome to RESTful User API!',
    });
  });

// Create a new user
router.route('/register').post(userCtrl.register);

// user login
router.route('/authenticate').post(userCtrl.authenticate);

// get all users
router.route('/users').get(userCtrl.getAllUsers);

// Export API routes
module.exports = router;