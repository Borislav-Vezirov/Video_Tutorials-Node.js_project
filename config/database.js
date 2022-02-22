const mongoose = require('mongoose');


async function initDb(){

    try {
        
        await mongoose.connect('mongodb://localhost:27017/videoTutorials');
        console.log('Connected to database');
        
    } catch (error) {
        console.log('Can\'t connect to database');
    };
};

module.exports = initDb;