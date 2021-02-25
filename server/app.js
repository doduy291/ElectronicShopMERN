const express = require('express');
const productsData = require('./dev-data/products');
const app = express();

// Replace Body-parse for Expressjs 4.16+
// Parse JSON Bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

//Router
app.get('/', (req, res) => {
  res.send('API is running');
});
app.get('/api/products', (req, res) => {
  res.send(productsData);
});
app.get('/api/products/:id', (req, res) => {
  const product = productsData.find((p) => p._id === req.params.id);
  res.json(product);
});

const port = process.env.PORT || 8000;
app.listen(port, console.log(`App running on port ${port}...`));
