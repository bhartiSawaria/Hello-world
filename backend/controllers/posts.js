
const User = require('../modals/user');
const TextPost = require('../modals/textPost');
const ImagePost = require('../modals/imagePost'); 

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
            res.status(201).json({
                message: 'Post saved successfully.',
                post: post
            })
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
    console.error('Image is', image);
    
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