const router = require('express').Router();

const branchCtrl = require('../controllers/branch.controller');

router.get('/', function(req,res){
    res.json({
      status: 'User API Its Working',
      message: 'Welcome to RESTful Branch API!',
    });
  });

// Create a new branch
router.route('/create').post(branchCtrl.create);

// update branch
router.route('/update').post(branchCtrl.update);

// get Branch By Id
router.route('/branchById').get(branchCtrl.getBranchById);

router.route('/branchOrganization').post(branchCtrl.getBranchOrganization);

// Export API routes
module.exports = router;