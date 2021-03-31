require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
// Require Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const payRoutes = require('./routes/payRoutes');
const app = express();

// Replace Body-parse for Expressjs 4.16+
// Parse JSON Bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Failed Connection', err);
  });

//Router
app.get('/', (req, res) => {
  res.send('API is running');
});
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use('/api/config', payRoutes);

//Error Handle
// Not found URL link
app.use(notFound);
// Error Handler
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, console.log(`App running on port ${port}...`));
