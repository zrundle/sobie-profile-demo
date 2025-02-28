const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const uri = process.env.MONGO_URI;
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb')
const URI = process.env.MONGO_URI;

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

const mongoCollection = client.db("sobie-app-database").collection("sobie-name-collection");

function initProfileData() {

    mongoCollection.insertOne({ 
      title: "this is blog title",
      post: "this is the post"
    });
  
  }

  app.get('/', async function (req, res) {
  
    let results = await mongoCollection.find({}).toArray(); 
    
    res.render('profile', 
      { profileData : results} ); 
  
  })



app.get('/read', async function (req, res) {
    let getDataResults = await getData();
    console.log(getDataResults);
    res.render('names',
        { nameData: getDataResults });

})

//DATA TYPES MATTER
app.post('/insert', async (req,res)=> {

    let results = await mongoCollection.insertOne({ 
      title: req.body.title,
      post: req.body.post
    });
  
    res.redirect('/');
  
  });
    
  app.post('/delete', async function (req, res) {
  
    let result = await mongoCollection.findOneAndDelete( 
    {
      "_id": new ObjectId(req.body.deleteId)
    }
  ).then(result => {
    
    res.redirect('/');
  })

}); 


app.post('/saveName', (req, res) => {
    console.log('hit POST endpoint?');

    console.log(req.body);
    res.redirect('/ejs');
})

app.post('/update', async (req,res)=>{
    let result = await mongoCollection.findOneAndUpdate( 
    {_id: ObjectId.createFromHexString(req.body.updateId)}, { 
      $set: 
        {
          title : req.body.updateTitle, 
          post : req.body.updatePost 
        }
       }
    ).then(result => {
    console.log(result); 
    res.redirect('/');
  })
  }); 

app.listen(
    port,
    () => console.log(`server is running on ... ${port}`
    )
)
