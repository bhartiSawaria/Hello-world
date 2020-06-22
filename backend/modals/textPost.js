
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const textPostSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true } );

module.exports = mongoose.model('textPost', textPostSchema);