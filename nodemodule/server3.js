const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Welcome to my hotel... How can I help you? We have a list of items in the menu.');
});

app.get('/item1', (req, res) => {
  res.send('Item 1');
});

app.get('/item2', (req, res) => {
  res.send('Item 2');
});

app.get('/item3', (req, res) => {
  res.send('Item 3');
});

app.get('/item4', (req, res) => {
  res.send('Item 4');
});

app.get('/item5', (req, res) => {
  res.send('Item 5');
});

app.get('/item6', (req, res) => {
  res.send('Item 6');
});

app.listen(port, () => {
  console.log(`Our Hotel server is live on port ${port}`);
});
