const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://shivank28011997:Shivank28@cluster0.ozuj3sd.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console,'error connecting to database'));

db.once('open', function(){
    console.log('Successfully connected to the database');
});

module.exports = db;