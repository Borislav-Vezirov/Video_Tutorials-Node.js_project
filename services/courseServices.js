const Course = require("../models/Course.js");


async function createPost(course){

    const result = new Course(course);

    await result.save();

    return result;
};

async function getAllCourse(){

    return await Course.find({}).lean();
};

module.exports = {
    createPost,
    getAllCourse
}
