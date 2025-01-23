//node app.js to run code 

const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'))


app.get('/', function (req, res) {
    res.sendFile('index.html');
})

app.post('/saveName', (req, res)=>{
    console.log('hit POST endpoint?');

    console.log(req.body);
    res.redirect('/ejs');    
})

app.get('/saveNameGet', (req, res)=>{
    console.log('hit GET endpoint?');

    console.log(req.query);
    res.render('words',
        {pageTitle: req.body.myName}
    );
    // res.redirect('/ejs');
    
})

// You need to type "/ejs" after localhost:3000 to find the ejs render webpage
app.get('/ejs', function (req, res){
    res.render('words',
        {pageTitle: 'My Cool EJS Page'}
    )
})

// You need to type "/nodemon" after localhost:3000 to find the nodemon webpage
app.get('/nodemon', function (req, res){
    res.send('NODEMON WORKS')
})


app.get('/hellorender', function (req, res) {
    res.send('Hello Express from the real world<br><a href="/">back to home</a>')
})

app.listen(
    port,
    () => console.log(`server is running on ... ${port}`
    )
)