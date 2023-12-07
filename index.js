const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');

const MongoStore = require('connect-mongo');

app.use(express.urlencoded());

// using static files
app.use(express.static('./assets'));

// using layouts
app.use(expressLayouts);

// extract styles and scripts from sub pages in the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'habit_tracker',
    // TODO change the secret before deployment in the production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/new_habit_tracker',
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));



app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});