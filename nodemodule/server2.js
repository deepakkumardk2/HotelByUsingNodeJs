const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./person'); // Importing the Person model
const path = require('path');

const app = express();
const router = express.Router(); // Define the router object

// Middleware
app.use(cors({ origin: 'http://localhost:5500' })); // Allow CORS for specific origin
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static('public')); // Serve static files from the "public" directory

// Connect to MongoDB
const dbURL = 'mongodb://localhost:27017/hotel'; // MongoDB connection string
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define the MenuItem model (make sure this schema exists)
const MenuItem = mongoose.model('MenuItem', new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
}));

// Sample Menu
const menu = [
  { id: 1, name: 'Pasta Alfredo', price: 11.99, category: 'Main Course' },
  { id: 2, name: 'Margherita Pizza', price: 10.99, category: 'Main Course' },
  { id: 3, name: 'Caesar Salad', price: 8.99, category: 'Appetizer' },
  { id: 4, name: 'Grilled Chicken', price: 14.99, category: 'Main Course' },
  { id: 5, name: 'French Fries', price: 4.99, category: 'Side Dish' },
  { id: 6, name: 'Chocolate Lava Cake', price: 6.99, category: 'Dessert' },
  { id: 7, name: 'Mango Smoothie', price: 5.99, category: 'Beverage' },
  { id: 8, name: 'Tandoori Roti', price: 1.99, category: 'Side Dish' },
  { id: 9, name: 'Tomato Soup', price: 3.99, category: 'Appetizer' },
  { id: 10, name: 'Lemon Iced Tea', price: 2.99, category: 'Beverage' },
];

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'menu.html')); // Serve menu.html
});

app.get('/menu', (req, res) => {
  res.json(menu); // Respond with the menu
});

// POST route to add a person
app.post('/person', async (req, res) => {
  try {
    const data = req.body; // Get request body
    const newPerson = new Person(data); // Create a new Person document
    const response = await newPerson.save(); // Save to database
    console.log('Data saved successfully');
    res.status(200).json(response); // Respond with the saved document
  } catch (err) {
    console.error('Error saving data:', err); // Log error
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with error
  }
});

// GET route to fetch all persons
app.get('/person', async (req, res) => {
  try {
    const data = await Person.find(); // Fetch all persons
    console.log('Data fetched successfully');
    res.status(200).json(data); // Respond with the data
  } catch (err) {
    console.error('Error fetching data:', err); // Log error
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with error
  }
});

// POST Method to add a Menu Item
app.post('/menu', async (req, res) => {
  try {
    const data = req.body; // Extract the request body
    const newMenu = new MenuItem(data); // Create a new MenuItem instance
    const response = await newMenu.save(); // Save the item to the database
    console.log('Data saved:', response);
    res.status(200).json(response); // Send success response
  } catch (err) {
    console.error('Error:', err); // Log the error
    res.status(500).json({ error: 'Internal Server Error' }); // Send error response
  }
});

// GET Method to get the Menu Items
app.get('/menu', async (req, res) => {
  try {
    const data = await MenuItem.find(); // Fetch all menu items
    console.log('Data fetched:', data); // Log the fetched data
    res.status(200).json(data); // Send success response
  } catch (err) {
    console.error('Error:', err); // Log the error
    res.status(500).json({ error: 'Internal Server Error' }); // Send error response
  }
});

// GET method to fetch persons based on work type
app.get('/person/:workType', async (req, res) => {
  try {
    const workType = req.params.workType; // Extract the work type from the URL parameter

    // Check if the work type is valid
    if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
      const response = await Person.find({ work: workType }); // Query the database
      console.log('Response fetched:', response);
      res.status(200).json(response); // Send the response
    } else {
      res.status(404).json({ error: 'Invalid work type' }); // Invalid work type error
    }
  } catch (err) {
    console.error('Error:', err); // Log the error
    res.status(500).json({ error: 'Internal Server Error' }); // Send server error response
  }
});

// Routes for updating and deleting persons
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // Extract the ID from the URL parameter
    const updatedPersonData = req.body; // Extract updated data from the request body

    // Update the person document in the database
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validation
      }
    );

    if (!response) {
      // If no person is found with the given ID
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('Person updated:', response);
    res.status(200).json(response); // Send the updated document as a response
  } catch (err) {
    console.error('Error updating person:', err); // Log the error
    res.status(500).json({ error: 'Internal Server Error' }); // Send error response
  }
});

router.delete('/:id', async (req, res) => {
  const personId = req.params.id; // Extract the person's ID from the URL parameter

  try {
    // Assuming you have a Person model
    const response = await Person.findByIdAndRemove(personId);

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('Data deleted');
    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use('/person', router); // Use the router for `/person` routes

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
