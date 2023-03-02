const express = require('express');
const app = express();
const db = require('./config/mongoose');

// setting the view engine to ejs
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    return res.end('hello');
})


app.listen(5000, (err)=>{
    if(err){
        console.log(err);
    }
    console.log('server has been started on port 5000');
})