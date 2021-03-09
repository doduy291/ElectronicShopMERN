import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addToCart } from '../actions/cartActions';

const CartScreen = ({ match, history, location }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    console.log('remove')
  }
  return (<Row>
    <Col md={8}>
      <h1> Shopping Mart</h1>
      {cartItems.length === 0 ? (<Message alert={'info'}>Your cart is empty <Link to='/'>GO BACK</Link></Message>) : (<ListGroup variant='flush'>{cartItems.map(item => (<ListGroup.Item key={item.product}>
          <Row>
            <Col md={2}>
              <Image src={item.image} alt={item.name} fluid rounded />
            </Col>
            <Col md={3}>
              <Link to={`product/${item.product}`}>{item.name}</Link>
            </Col>
            <Col md={2}>{item.price}</Col>
            <Col md={2}>
              <div className="component-quantity">
                <button className="quantity-input__modifier quantity-input__modifier--left" >
                  -
                </button>
                <input className="quantity-input__screen" type="text"  readOnly />
                <button className="quantity-input__modifier quantity-input__modifier--right" >
                  +
                </button>
              </div>
            </Col>
            <Col md={2}><Button type='button' variant='light' onClick={removeFromCartHandler}><i className='fas fa-trash'></i></Button></Col>
          </Row>
      </ListGroup.Item>)
      )}</ListGroup>) }
    </Col>
    <Col md={4}>
      <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Subtotal ({cartItems.reduce((pre,cur) =>  pre + cur.qty, 0)})</h2>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
    
  </Row>);
};

export default CartScreen;
