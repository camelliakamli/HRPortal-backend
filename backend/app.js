const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();
const User = require('./models/User');
const Document = require('./models/Document');
const Demande = require('./models/Request');
const Profile = require('./models/Profile');
const Role = require('./models/Role');

//DATABSE CONNECTION
mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("Connected to  DB Successfully");
}).catch((error)=>{
    console.log("Connection to DB failed" , error);
});

app.get('/', (req, res) =>{
    res.send('Hello World');
});

app.listen(8800, () => {
  console.log("Server listening at port 8800 🚀");
});