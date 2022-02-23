const Course = require("../models/Course.js");
const User   = require("../models/User.js");

async function createPost(course){

    const result = new Course(course);

    await result.save();

    return result;
};

async function getAllCourse(){

    return await Course.find({}).lean();
};

async function getOneById(id){

    return await Course.findById(id).lean();
};

async function getOneAndUpdate(id, post){

    return await Course.findByIdAndUpdate(id, post);

};

async function deletePost(id){

    return await Course.findOneAndDelete({_id: id});
};


async function enroll(postId, userId){

    const post = await Course.findById(postId);
    
    if(post && post.enrolledUsers.includes(userId)){
        throw new Error('You already enrolled!')
    };

    const user = await User.findById(userId);

    console.log(user);

    user.courses.push(postId);

    post.enrolledUsers.push(userId);

    await post.save();
};




module.exports = {
    createPost,
    getAllCourse,
    getOneById,
    getOneAndUpdate,
    deletePost,
    enroll
}
