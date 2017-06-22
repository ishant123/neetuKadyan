var express = require("express");
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5

var upload = multer();
var app = express();
var port = 3000;

app.use(express.static('public'));
app.use(express.static('src/view'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var transporter = nodemailer.createTransport("SMTP", {
    service: 'Gmail',
    auth: {
        user: "resumeinput1@gmail.com",
        pass: "ISHANT123"
    }
});

app.listen(port,function(error){
   console.log("runing application on port" + port);
});

app.get('/',function(req,res){
        res.send("hello app");
});
app.post('/sendEmail',upload.array(),function(req,res){
    var mailOptions = {
        from: 'resumeinput1@gmail.com' , // sender address
        to: 'resumeinput1@gmail.com', // list of receivers
        subject: req.body.contactSubject + '-Subject', // Subject line
        text:"Name : " + req.body.contactName  +"\n Mail Id : "+ req.body.contactEmail +"\n Message : " + req.body.contactMessage // plaintext body

    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
    });
    res.send("Ok");

});