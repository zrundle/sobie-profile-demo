const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.sendFile('index.html');
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