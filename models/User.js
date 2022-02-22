const mongoose = require('mongoose');


const pattern  = /^[A-Za-z0-9]{5, }$/;

const userSchema = new mongoose.Schema({
    username: {type: String, validate: {
        validator(value){
            return pattern.test(value);
        },
        message: 'First name must contains only english letters and digits!'
    }},
    password: {type: String, validate: {
        validator(value){
            return pattern.test(value);
        },
        message: 'Password must contains only english letters and digits and be more than 4 characters!'
    }},
    courses : [],
});

userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale   : 'en',
        strength : 2
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;