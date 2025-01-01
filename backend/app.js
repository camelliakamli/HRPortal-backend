const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
require('dotenv').config(); 
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const documentRoutes = require('./routes/documentRoutes');
const demandeRoutes = require('./routes/demandeRoutes');

const app = express();
const User = require('./models/User');
const Document = require('./models/Document');
const Demande = require('./models/Demande');
const Profile = require('./models/Profile');
const ArchivedDocument = require('./models/ArchivedDocuments');
const DistributedDocument = require('./models/DistributedDocument');
const Department = require('./models/Department');

// Enable CORS for all origins (or customize as needed)
app.use(cors());

// Middleware to parse the incoming request body
app.use(express.json());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((error) => {
    console.log("Connection to DB failed", error);
  });

// Define Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/users', userRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/demandes', demandeRoutes);

// Start the Server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
