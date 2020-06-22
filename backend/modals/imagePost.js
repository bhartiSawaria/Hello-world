
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imagePostSchema = new Schema({
    caption: {
        type: String
    },
    imageUrl: {
        type: String,
        required: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true } );

module.exports = mongoose.model('imagePost', imagePostSchema);