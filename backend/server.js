const express = require('express');
const cors = require('cors'); // Import the cors middleware
const mongoose = require('mongoose');

// Updating the MongoDB URI to use the service name within the Docker network
const mongoDBUri = 'mongodb://POTLClient:2mzG28gHD94rOd0684sx@mongo:27017/POTLdb?authSource=admin';

mongoose.connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const app = express();
const port = 3000; // Adjust the port as needed

// Configure CORS to allow requests from your Angular app's origin
app.use(cors());

// Middlewares
app.use(express.json());

// Routes
const noteRoutes = require('./routes/noteRoutes');
app.use(noteRoutes);

// Define your API routes
app.get('/api/data', (req, res) => {
  // Your API logic here
  res.json({ message: 'Hey look I am backend data!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
