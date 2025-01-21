const express = require('express');
const router = express.Router();
const Person = require('./models/Person'); // Assuming the Mongoose model is defined in './models/Person'
const MenuItem = require('./models/MenuItem'); // Assuming the Mongoose model is defined in './models/MenuItem'

// POST route to add a person
router.post('/person', async (req, res) => {
    try {
        const data = req.body; // Extract the person data from the request body
        const newPerson = new Person(data); // Create a new Person document
        const response = await newPerson.save(); // Save the new person to the database
        console.log('Data saved:', response);
        res.status(200).json(response); // Send success response
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ error: 'Internal Server Error' }); // Send error response
    }
});

// GET method to get all persons
router.get('/person', async (req, res) => {
    try {
        const response = await Person.find(); // Fetch all persons from the database
        console.log('Data fetched:', response);
        res.status(200).json(response); // Send success response
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error' }); // Send error response
    }
});

// POST route to add a Menu Item
router.post('/menu', async (req, res) => {
    try {
        const data = req.body; // Extract the menu item data from the request body
        const newMenu = new MenuItem(data); // Create a new MenuItem document
        const response = await newMenu.save(); // Save the new menu item to the database
        console.log('Data saved:', response);
        res.status(200).json(response); // Send success response
    } catch (err) {
        console.error('Error saving data:', err); // Log the error
        res.status(500).json({ error: 'Internal Server Error' }); // Send error response
    }
});

// GET method to fetch all Menu Items
router.get('/menu', async (req, res) => {
    try {
        const data = await MenuItem.find(); // Fetch all menu items from the database
        console.log('Data fetched:', data);
        res.status(200).json(data); // Send success response
    } catch (err) {
        console.error('Error fetching data:', err); // Log the error
        res.status(500).json({ error: 'Internal Server Error' }); // Send error response
    }
});

module.exports = router;
