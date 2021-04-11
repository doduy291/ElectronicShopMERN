import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductCreateScreen from './screens/admin/ProductCreateScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ErrorScreen from './screens/ErrorScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/cart" component={CartScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/search/:keyword" component={HomeScreen} exact />
            <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact />
            <Route path="/page/:pageNumber" component={HomeScreen} exact />
            <Route path="/admin/userlist" component={UserListScreen} />
            <Route path="/admin/productlist" component={ProductListScreen} exact />
            <Route path="/admin/productlist/page/:pageNumber" component={ProductListScreen} exact />
            <Route path="/admin/orderlist" component={OrderListScreen} />
            <Route path="/admin/create-product" component={ProductCreateScreen} />
            <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route path="*" component={ErrorScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
