const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 
const userRoutes = require('./routes/userRoutes');


const app = express();
const User = require('./models/User');
const Document = require('./models/Document');
const Demande = require('./models/Demande');
const Profile = require('./models/Profile');
const Role = require('./models/Role');

app.use (express.json()); //middleware to parse the incoming request body

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

app.use('/api/users', userRoutes);


app.listen(8800, () => {
  console.log(`Server running on port 8800 🚀`);
});