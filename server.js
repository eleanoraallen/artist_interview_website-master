const express = require('express');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');

const app = express();

//********** DATABASE CODE ***********/
const mongoose = require('mongoose');
const Article = require('./models/article');
const db = mongoose.connection;
const url = "mongodb+srv://admin:admin@sugardevdb-hoj4n.mongodb.net/test?retryWrites=true&w=majority";


db.on('error', console.error); // log any errors that occur

// bind a function to perform when the database has been opened
db.once('open', function() {
  // perform any queries here, more on this later
  console.log("Connected to DB!");
});


process.on('SIGINT', function() {
    // process is a global object referring to the system process running this
    // code, when you press CTRL-C to stop Node, this closes the connection
   mongoose.connection.close(function () {
       console.log('DB connection closed by Node process ending');
       process.exit(0);
   });
});

(async () => {
    try {
        mongoose.set('useCreateIndex', true);
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true,  });
    } catch (error) {
        console.error(error);
    }
})();

//********** DATABASE CODE ENDS ***********/



app.set('view engine', 'ejs');

// Public folder
app.use(express.static('./public'));


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));



app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    });
    res.render('articles/', { articles });
});

const PORT = 5000;

app.use('/articles', articleRouter);
app.listen(PORT);

console.log(`Server running on localhost:${PORT}`);