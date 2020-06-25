
const User = require('../modals/user');

exports.getProfile = async (req, res, next) => {
    try{
        const userId = req.userId;
        const user = await User.findById(userId);
        res.status(200).json({message: 'User info fetched successfully.', user: user});
    }catch(err){
        const error = new Error(err);
        error.setStatus = 500;    
        next(error);
    }
}

exports.deleteAccount = async (req, res, next) => {
    try{
        const userId = req.userId;
        const result = await User.findByIdAndDelete(userId);
        res.status(200).json({message: 'Account deleted successfully'});
    }catch(err){
        const error = new Error(err);
        error.setStatus = 500;    
        next(error);
    }
}

exports.editAccountDetails = async (req, res, next) => {
    try{
        const userId = req.userId;
        const user = await User.findById(userId);
        if(req.body.name){
            user.name = req.body.name;
        }
        if(req.body.username){
            user.username = req.body.username;
        }
        if(req.body.email){
            user.email = req.body.email;
        }
        if(req.file){
            user.imageUrl = req.file.path;
        }
        const updatedUser = await user.save();
        res.status(200).json({message: 'Account info updated successfully.', user: updatedUser})
    }catch(err){
        const error = new Error(err);
        error.setStatus = 500;    
        next(error);
    }
}