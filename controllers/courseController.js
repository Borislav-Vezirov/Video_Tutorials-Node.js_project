const { isUser } = require('../middlewares/guards.js');
const { createPost } = require('../services/courseServices.js');
const mapErrors = require('../utils/mappers.js');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', { pageTitle: 'Create Page' });
});

router.post('/create', isUser(), async (req, res) => {
    
    const userId = req.session.user._id;
    
    const course = {
        title        : req.body.title,
        description  : req.body.description,
        image        : req.body.image,
        isPublic     : req.body.isPublic,
        createdAt    : req.body.createdAt,
        enrolledUsers: req.body.enrolledUsers,
        author       : userId
    };

    course.isPublic = req.body.isPublic == 'on' ? true : false;

    try {
        
        await createPost(course);

        res.redirect('/');

    } catch (error) {
        
        const errors = mapErrors(error);
        res.render('create', { pageTitle: 'Create Page', errors , ...course});

    }
});

module.exports = router;