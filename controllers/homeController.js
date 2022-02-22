const { getAllCourse } = require('../services/courseServices.js');

const router = require('express').Router();

router.get('/', async (req, res) => {

    let posts =  await getAllCourse();

    const datePattern = new RegExp(/^[A-Za-z]+ | [\d+:\d+:\d+]+ GMT/gi)
    
    posts.forEach(x => x.createdAt = x.createdAt.toString().split(datePattern)[1]);
    console.log(posts);

    res.render('home', { pageTitle: 'Home Page', posts });
});


module.exports = router;