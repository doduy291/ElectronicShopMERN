require('dotenv').config();
const mongoose = require('mongoose');
const productsData = require('./dev-data/products');
const usersData = require('./dev-data/users');
const productModel = require('./models/Product_Model');
const userModel = require('./models/User_Model');

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

const importData = async () => {
  try {
    await productModel.deleteMany();
    await userModel.deleteMany();

    const createdUsers = await userModel.insertMany(usersData);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = productsData.map((product) => {
      return { ...product, _iduser: adminUser };
    });
    await productModel.insertMany(sampleProducts);
    console.log('Data Imported');
  } catch (err) {
    console.log('Cannot Import Data');
    console.log(err);
  }
};

importData();
