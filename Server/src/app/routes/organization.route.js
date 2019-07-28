const router = require('express').Router();

const organizationCtrl = require('../controllers/organization.controller');

router.get('/', function(req,res){
    res.json({
      status: 'User API Its Working',
      message: 'Welcome to RESTful Organization API!',
    });
  });

// Create a new Organization
router.route('/create').post(organizationCtrl.create);

// update Organization
router.route('/update').post(organizationCtrl.update);

// get Organization By Id
router.route('/organizationById').get(organizationCtrl.getOrganizationById);

// Export API routes
module.exports = router;