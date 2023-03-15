const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/authentication_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "database connection failed"));

db.once('open', (err)=>{
    if(err){
        console.log(err);
    }
    console.log('database connected successfully');
})

module.exports = db;