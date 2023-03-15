const user = require('../models/user');
const {spawn} = require('child_process');


module.exports.home = function(req, res){
    var dataToSend;
 // spawn new child process to call the python script
    const python = spawn('python3', ['script.py']);
 // collect data from script
    python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    console.log(data);
    dataToSend = data.toString();
 });
    console.log(dataToSend);
 // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
 });
    return res.render('home', {
        title : 'Home Page | Nodejs Authentication'
    });
}