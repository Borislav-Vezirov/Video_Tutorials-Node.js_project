const router = require('express').Router();
const homeController = require('../controllers/homeController.js');
const authController = require('../controllers/authController.js');
const courseController = require('../controllers/courseController.js');


router.use(homeController);
router.use(authController);
router.use(courseController);

router.use('*', (req, res) => {
    
    res.render('404');
});


module.exports = router;