const mongoose = require('mongoose');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    interviewer: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
    },
    tags: {
        type: String,
    },
    description: {
        type: String
    },
    pageHtml: {
        type: String
    },
    content: {
        type: [{
            type: String
        }],

        default: [],
    },
    types: {
        type: [{
            type: String
        }],

        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
});

articleSchema.pre('validate', function(next) {
    this.title = this.artist + " with " + this.interviewer + String(Number(this.createdAt));
    if(this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true});
    }

    next();
})

module.exports = mongoose.model('Article', articleSchema);