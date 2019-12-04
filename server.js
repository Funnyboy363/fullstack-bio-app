var http = require("http"); 
var url = require("url"); 
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');  // calls the body parser
require('dotenv').config(); //this is what helps to hide the login for MongoDB connection
const cors = require('cors');
const Joi = require('joi');
const Post = require('./models/Post');
app.use(cors());
app.use(bodyParser.json());    // Uses the body parser
app.use(bodyParser.urlencoded({ extended: true }));
//Import routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);  // can add multiple routes or posts



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});


//Routes
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });  //When using get send with the / route that basically just sends a message when you go to that

var nameSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  fruit: String,
 });
 
 var User = mongoose.model("User", nameSchema);

// // Submits a post
app.post('/addname', async (req, res) => {
  const post = new User({
     firstName: req.body.firstName,
      lastName: req.body.lastName,
      fruit: req.body.fruit
  });
 try {
     const savedPost = await post.save();
     res.send("item saved to database. Check out the <a href='/api/users'>JSON FILE</a> "+ '<a href="/">Back to Form</a>');
    
 } catch (err) {
     res.json({ message: err });
     res.status(400).send("unable to save to database");
 }
});



//Gets back all the posts
app.get('/api/users', async (req, res) => {
    try{
     const posts = await User.find();
     res.json(posts);
    } catch (err) {
     res.json({ message: err });
    }
  }); 
  




//Connect to DB
mongoose.Promise = global.Promise;
mongoose.connect (
process.env.DB_CONNECTION,
 { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to DB!')
);










app.listen(process.env.PORT || 8000, function(){
    console.log('Your node js server is running');
});
