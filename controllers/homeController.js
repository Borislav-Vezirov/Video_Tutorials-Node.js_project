const { isUser } = require('../middlewares/guards.js');
const { getAllCourse, getOneById } = require('../services/courseServices.js');

const router = require('express').Router();

router.get('/', async (req, res) => {

    let allPosts = await getAllCourse();

    let posts = [];
    
    allPosts.map(x => x.isPublic == true ? posts.push(x) : null );

    const datePattern = new RegExp(/^[A-Za-z]+ | [\d+:\d+:\d+]+ GMT/gi)
    
    posts.map(x => x.createdAt = x.createdAt.toString().split(datePattern)[1]);

    res.render('home', { pageTitle: 'Home Page', posts });
});

router.get('/details/:id', async (req, res) => {

    const id = req.params.id;

    const post = await getOneById(id);
    
    if(req.session.user){
        
        post.hasUser = true;
        
        if(req.session.user._id == post.author._id){
            
            post.isAuthor = true;
        }else{
            
            post.isJoined = post.enrolledUsers.find(x => x._id == req.session.user._id) != undefined;
            
        };
    };

    res.render('details', { title: 'Details Page', ...post });
});

router.get('/profile', isUser(), async (req, res) => {
    
    const user = req.session.user;
    
    res.render('profile', { title: 'Profile Page' , user});
});


module.exports = router;