const express = require('express');
const Article = require('./../models/article');
const router = express.Router();


const initializePassport = require('../passport-config')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')





var isAdmin = false;

let admin = {
    name: 'admin',
    email: 'admin@admin.com',
    password: 'admin',
  };


  function isAuthenticated(){
      return isAdmin;
  }



  let hashedPassword = hashPassword(admin.password);
  

  
  
  admin = {
    id: Date.now().toString(),
    name: admin.name,
    email: admin.email,
    password: hashedPassword
  };

initializePassport(
    passport,
    email => admin,
    id => admin,
  );


router.use(flash())
router.use(session({
  secret: '1234', // process.env.SESSION_SECRET
  resave: false,
  saveUninitialized: false
}))
router.use(passport.initialize())
router.use(passport.session())



router.get('/admin',  checkAuthenticated, (req, res) => { // 
    res.render('articles/admin');
  });

router.get('/change', checkAuthenticated, (req, res) => {
  res.render('articles/change', { message : '' });
});

router.post('/change', checkAuthenticated, async (req, res) => { // 
  const oldpassword = req.body.oldpassword;
  const newpassword = req.body.newpassword;
  const repeatpassword = req.body.repeatpassword;

  if(hashedPassword !== hashPassword(oldpassword)){
    res.render('articles/change', { message : 'Incorrect password entered!' });
  } else if(newpassword !== repeatpassword) {
    res.render('articles/change', { message : 'New password does not match!' });
  } else {
    hashedPassword = hashPassword(newpassword);
    res.render('articles/admin');
  }
  
  isAdmin = hashedPassword === hashPassword(enteredPassword);
  //console.log('isAdmin = ' + isAdmin);
  res.redirect('/articles/admin');

});


router.post('/login', checkNotAuthenticated, async (req, res) => { // 
    //console.log('Login body:');
    //console.log(req.body);
    let enteredPassword = req.body.password;
    
    isAdmin = hashedPassword === hashPassword(enteredPassword);
    //console.log('isAdmin = ' + isAdmin);
    res.redirect('/articles/admin');

  });


  router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('articles/login');
  });




router.get('/', async (req, res) => {
    console.log('index is rendered')
    const articles = await Article.find().sort({
        createdAt: 'desc'
    });
    res.render('articles/index', { articles });
});


router.get('/contact', (req, res) => {
    res.render('articles/contact', { article: new Article() })
});

router.get('/about', (req, res) => {
    res.render('articles/about', { article: new Article() })
});

router.get('/new', checkAuthenticated, (req, res) => {
    res.render('articles/new', { article: new Article() })
});

router.get('/archive', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    });
    res.render('articles/archive', { articles });
});

router.get('/view', checkAuthenticated, async (req, res) => {
  const articles = await Article.find().sort({
      createdAt: 'desc'
  });
  res.render('articles/view', { articles });
});



router.get('/:slug', async (req, res) =>{
    try {
        const article = await Article.findOne({ slug: req.params.slug });
        
        if (article == null) res.redirect('/');

        res.render('articles/show', { article: article });
        
    } catch (error) {
        console.log('Couldnt find article' + error);
        res.redirect('/');
    }
});

router.post('/', async (req, res, next) => {
   req.article = new Article();
   next();

    
}, saveArticleAndRedirect('new'));

router.put('/:id', async (req, res, next) => {
  try{
    req.article = await Article.findById(req.params.id);
    next();
  } catch (error) {
    console.log('Couldnt find article' + error);
    res.redirect('/');
  }

     
 }, saveArticleAndRedirect('/'));


 router.delete('/logout', async (req, res) => {
  //console.log('delete is catched');
  isAdmin = false;
  await res.redirect('/articles/login')
});


router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/articles/view');
});



function hashPassword(password){ return require('crypto').createHash('sha256').update(password, 'utf8').digest('hex'); }

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article;
        console.log("printing post body");
        console.log(req.body);
        article.title = req.body.title;
        article.artist = req.body.artist;
        article.interviewer = req.body.interviewer;
        article.thumbnail = req.body.thumbnail;
        article.caption = req.body.caption;
        article.description = req.body.description;
        article.pageHtml = req.body.pageHtml;
        article.tags = req.body.tags;
        article.content =  req.body['content[]'] ? req.body['content[]'] : [];
        article.types = req.body['type[]'] ? req.body['type[]'] : [];
        
        try {
            article.markModified('content');
            article = await article.save();
            res.redirect(`/articles/${article.slug}`);
        } catch (err) {
            console.log("Post Errorr:" + err);
            res.render(`articles/${path}`, { article: article });
        }
    }
}




function checkAuthenticated(req, res, next) {
    if (isAuthenticated()) {
        //console.log('checkAuthenticated passed')
      return next()
    }
    console.log('checkAuthenticated failed')
    res.redirect('/articles/login');
  }


  function checkNotAuthenticated(req, res, next) {
    if (isAuthenticated()) {
      res.redirect('/articles/admin')
    }
    next()
  }



module.exports = router;