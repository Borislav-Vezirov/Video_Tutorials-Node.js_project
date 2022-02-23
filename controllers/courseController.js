const { isUser } = require('../middlewares/guards.js');
const { createPost, getOneById, getOneAndUpdate, deletePost, enroll } = require('../services/courseServices.js');
const mapErrors = require('../utils/mappers.js');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', { pageTitle: 'Create Page' });
});

router.post('/create', isUser(), async (req, res) => {
    
    const userId = req.session.user._id;

    console.log(userId);
    
    const course = {
        title        : req.body.title,
        description  : req.body.description,
        image        : req.body.image,
        isPublic     : req.body.isPublic,
        createdAt    : req.body.createdAt,
        enrolledUsers: req.body.enrolledUsers,
        author       : userId,
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

router.get('/edit/:id', isUser(), async (req, res) => {
    
    const id = req.params.id;

    const post = await getOneById(id);

    if(req.session.user._id != post.author._id){

        return res.redirect('/login');
    };
 

    res.render('edit', { title: 'Edit Page', ...post })
});

router.post('/edit/:id', isUser(), async (req, res) => {
    
    const id = req.params.id;

    const existing = await getOneById(id);

    req.body.isPublic = req.body.isPublic == 'on' ? true : false;


    if(req.session.user._id != existing.author._id){

        return res.redirect('/login');
    };

    try {

        await getOneAndUpdate(id, req.body);
        res.redirect('/details/' + id);
        
    } catch (error) {
        const errors = mapErrors(error);
        res.render('edit', { title: 'Edit Page', errors});
        
    }
});

router.get('/enroll/:id/', isUser(), async (req, res) => {
    
    const id = req.params.id;

    try {
        
        await enroll(id, req.session.user._id);

        res.redirect('/details/' + id);

    } catch (error) {

        const errors = mapErrors(error);
        res.render('details', { errors });

    };
});

router.get('/delete/:id', isUser(), async (req, res) => {

    const id = req.params.id;

    const existing = await getOneById(id);

    if(req.session.user._id != existing.author._id){

        return res.redirect('/login');
    };
   
    try {
        
        await deletePost(id);

        res.redirect('/');

    } catch (error) {
        const errors = mapErrors(error);
        res.render('details', { errors });
    }
});



module.exports = router;