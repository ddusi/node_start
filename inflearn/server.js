var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')
var main = require('./router/main')

var connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: '1234',
    database: 'jsman'
})

connection.connect()

// connection.query('SELECT * FROM user', function(err, rows, fields){
//     if (err) throw err
//     console.log(rows[0])
// })

// connection.end()

app.listen(3000, function(){
    console.log("start, express server on port 3000");
});

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

//url routing
app.get('/', function(req,res){
    console.log('test');
    //res.send("<h1>hi!!! send data</h1>")
    res.sendFile(__dirname + '/public/main.html')
})

app.use('/main', main)


// app.get('/main', function(req,res){
//     res.sendFile(__dirname + '/public/main.html')
// })

app.post('/email_post', function(req, res){
    // get : req.params('email')
    console.log(req.body.email)
    // res.send("<h1> welcome !" + req.body.email + "</h1>")
    // res.send("post response")
    //
    res.render('email.ejs', {'email' : req.body.email})
})

app.post('/ajax_send_email', function(req,res) {
    var email = req.body.email;
    var responseData = {};
    // var responseData = {'result' : 'ok', 'email' : req.body.email}

    var query = connection.query('select name from user where email="' + email +'"', function(err, rows){
        if(err) throw err;
        if(rows[0]) {
            console.log(rows[0].name)
            // responseData.result = "ok";
            // responseData.name = row[0].name;
        } else{
            console.log('none : ' + rows[0])
        }
    })

    // res.json(responseData)
});