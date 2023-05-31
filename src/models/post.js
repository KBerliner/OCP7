// Installing Dependencies

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Creating a blueprint for the "Post" object

const postSchema = mongoose.Schema({
    title: {
        type: String,
        default: ''
        // required: true
        },
    username: {
        type: String,
        default: ''
    },
    caption: {
        type: String,
        default: ''
        // required: true
    },
    imageUrl: {
        type: String,
        default: ''
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    usersLiked: [],
    usersDisliked: []
});

postSchema.plugin(uniqueValidator);

// Exporting the Post Blueprint

module.exports = mongoose.model('Post', postSchema);