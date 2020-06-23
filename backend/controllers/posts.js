
const User = require('../modals/user');
const TextPost = require('../modals/textPost');
const ImagePost = require('../modals/imagePost'); 
const mongoose = require('mongoose');
const { use } = require('../routes/auth');

exports.createTextPost = (req, res, next) => {
    let title = '';
    if(req.body.title){
        title = req.body.title;
    }
    const content = req.body.content;
    const userId = req.userId;
    User.findById(userId).then(user => {
        if(user){
            const post = new TextPost({
                title: title,
                content: content,
                postedBy: user
            });
            return post.save();
        }
        const error = new Error('User not found.');
        next(error);
    })
    .then(post => {
        if(post){
            res.status(201).json({message: 'Post saved successfully', post: post});
        }
    })
    .catch(err => {
        const error = new Error(err);
        error.setStatus = 500;    
        next(error);    
    })
}

exports.createImagePost = (req, res, next) => {
    const image = req.file;
    
    if(!image){
        const error = new Error('Image not found.');
        throw error;
    }
    const caption = req.body.caption;
    User.findById(req.body.userId).then(user => {
        if(user){
            const post = new ImagePost({
                caption: caption,
                imageUrl: image.path,
                postedBy: user
            })
            return post.save();
        }
    })
    .then(post => {
        res.status(201).json({message: 'Post saved successfully', post: post});
    })
    .catch(err => {
        const error = new Error(err);
        error.setStatus = 500;    
        next(error); 
    })
}

exports.getFeed = (req, res, next) => {
    let posts = [];
    TextPost.find()
        .populate('postedBy')
        .exec()
        .then(textPosts => {
            posts = [...textPosts];
            // console.log('TextPosts', textPosts);
            return ImagePost.find().populate('postedBy').exec();
        })
        .then(imagePosts => {
            // console.log('ImagePosts ', imagePosts);
            posts = posts.concat(imagePosts);
            res.status(200).json({message: 'Posts fetched successfully', posts: posts})
        })
        .catch(err => {
            const error = new Error(err);
            error.setStatus = 500;    
            next(error);
        })
};

exports.postSaveImagePost = (req, res, next) => {
    const postId = req.body.postId;
    console.log('Post id in controllers', postId);
    if(!postId){
        const error = new Error('Post id is incorrect.');
        throw error;
    }
    User.findById(req.userId).then(user => {
        if(user){
            const updatedSavedImagePosts = [...user.savedImagePosts];
            updatedSavedImagePosts.push(new mongoose.Types.ObjectId(postId));
            user.savedImagePosts = updatedSavedImagePosts;
            return user.save();
        }
    })
    .then(user => {
        if(user){
            res.status(201).json({message: 'Post saved successfully'});
        }
    })
    .catch(err => {
        const error = new Error(err);
        error.setStatus = 500;    
        next(error);
    })
};

exports.postSaveTextPost = (req, res, next) => {
    const postId = req.body.postId;
    if(!postId){
        const error = new Error('Post id is incorrect.');
        throw error;
    }
    User.findById(req.userId).then(user => {
        if(user){
            const updatedSavedTextPosts = [...user.savedTextPosts];
            updatedSavedTextPosts.push(new mongoose.Types.ObjectId(postId));
            user.savedTextPosts = updatedSavedTextPosts;
            return user.save();
        }
    })
    .then(user => {
        if(user){
            res.status(201).json({message: 'Post saved successfully'});
        }
    })
    .catch(err => {
        const error = new Error(err);
        error.setStatus = 500;    
        next(error);
    })
};

exports.removeSavedImagePost = (req, res, next) => {
    const postId = req.body.postId;
    const userId = req.userId;
    User.findById(userId).then(user => {
        if(user){
            const updatedSavedImagePosts = user.savedImagePosts.filter(post => post._id != postId);
            user.savedImagePosts = updatedSavedImagePosts;
            return user.save();
        }
    })
    .then(user => {
        if(user){
            res.status(201).json({message: 'Post removed successfully'});
        }
    })
    .catch(err => {
        const error = new Error(err);
        error.setStatus = 500;    
        next(error);
    })
}

exports.removeSavedTextPost = (req, res, next) => {
    const postId = req.body.postId;
    const userId = req.userId;
    User.findById(userId).then(user => {
        if(user){
            const updatedSavedTextPosts = user.savedTextPosts.filter(post => post._id != postId);
            user.savedTextPosts = updatedSavedTextPosts;
            return user.save();
        }
    })
    .then(user => {
        if(user){
            res.status(201).json({message: 'Post removed successfully'});
        }
    })
    .catch(err => {
        const error = new Error(err);
        error.setStatus = 500;    
        next(error);
    })
}