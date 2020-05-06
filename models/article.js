const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const domPurify = createDomPurify(new JSDOM().window);

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
    sanitizedHtml: {
        type: String,
        default: "",
    },
});

articleSchema.pre('validate', function(next) {
    this.title = this.artist + " with " + this.interviewer + String(Number(this.createdAt));
    if(this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true});
    }

    this.sanitizedHtml = "";
    for(let i = 0; i < this.content.length; i++){
        let html;
        let text = this.content[i];
        //console.log('type:' + this.types[i]);
        if(this.types[i] === 'markdown'){
            html = getDiv(domPurify.sanitize(marked(text)));
        } else if(this.types[i] === 'question'){
            html = getQuestion(domPurify.sanitize(marked(text)));
        } else {
            html = getImageTag(domPurify.sanitize(text));
        }
        this.sanitizedHtml += html;
    };
    next();
})

function getDiv(text){
    return `
    <div class="interviewAnswer">
        ${text}
    </div>
    `;
}

function getQuestion(text){
    return `
    <div class="interviewQuestion">
        ${text}
    </div>
    `;
}



function getImageTag(link){
    return `
    <div class="interviewImageContainer">
        <img src="${link}" class="responsive-img" alt="image doesn't exist" class="interviewImage">
    </div>
    `;
    
}

module.exports = mongoose.model('Article', articleSchema);