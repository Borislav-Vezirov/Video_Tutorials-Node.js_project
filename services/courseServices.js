const Course = require("../models/Course.js");


async function createPost(course){

    const result = new Course(course);

    await result.save();

    return result;
};

module.exports = {
    createPost
}
