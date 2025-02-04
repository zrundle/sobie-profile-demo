//how to clone repo with git bash:
//mkdir repos/
//cd repos/
//git clone https://github.com/zrundle/sobie-profile-demo.git
//code .
//OR NPM install
//npm i ejs
//npm install mongodb
//npm run dev to run entire app off of RENDER    
//node app.js to run code
//MAKE .ENV FILE 

//how to save code and post to github repo
//git status    
//git add . (. = all)
//git commit -m 'ENTER COMMMIT MESSAGE'
//git push


const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const uri = process.env.MONGO_URI;
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// console.log(shajs('sha256').update('cat').digest('hex'));

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
// run().catch(console.dir);

async function getData() {

    await client.connect();
    let collection = await client.db("sobie-app-database").collection("sobie-name-collection");

    let results = await collection.find({}).toArray();

    console.log(results);
    return results;

}

app.get('/read', async function (req, res) {
    let getDataResults = await getData();
    console.log(getDataResults);
    res.render('names',
        { nameData: getDataResults });

})


app.get('/', function (req, res) {
    res.sendFile('index.html');
})

app.post('/saveName', (req, res) => {
    console.log('hit POST endpoint?');

    console.log(req.body);
    res.redirect('/ejs');
})


//req: Request from server
//res: Response

app.get('/saveNameGet', (req, res) => {
    console.log('hit GET endpoint?');

    console.log(req.query);

    let reqName = req.query.myNameGet;
    res.render('words',
        { pageTitle: reqName }
    );
    // res.redirect('/ejs');

})

// You need to type "/ejs" after localhost:3000 to find the ejs render webpage
app.get('/ejs', function (req, res) {
    res.render('words',
        { pageTitle: 'My Cool EJS Page' }
    )
})

// You need to type "/nodemon" after localhost:3000 to find the nodemon webpage
app.get('/nodemon', function (req, res) {
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