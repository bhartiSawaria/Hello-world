
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    savedImagePosts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'imagePost'
        }
    ],
    savedTextPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'textPost'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);