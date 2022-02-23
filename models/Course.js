const mongoose = require('mongoose');


const pattern  = /^[A-Za-z0-9]{5,}$/;

const userSchema = new mongoose.Schema({
    title         : {type: String, required: true},
    description   : {type: String, required: true},
    image         : {type: String, required: true},
    isPublic      : {type: Boolean, default: false },
    enrolledUsers : [{type: mongoose.Types.ObjectId, ref: 'User'}],
    author        : {type: mongoose.Types.ObjectId, ref: 'User'}
},{
    
    timestamps: true
});

const Course = mongoose.model('Course', userSchema);

module.exports = Course;