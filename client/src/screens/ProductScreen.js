import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Quantity from '../components/Quantity';
import axios from 'axios';
import { productDetailsAction } from '../actions/productActions';

const ProductScreen = ({ match, history }) => {
  // 'match' object contains information about how a <Route path> matched the URL
  // const product = productsData.find((p) => p._id === match.params.id);

  // ****** WITH REACT STATE ******//
  const [valueQuantity, setValueQuantity] = useState(1);

  // const [oneProduct, setOneProduct] = useState({});
  // useEffect(() => {
  //   const fetchOneProduct = async () => {
  //     const { data } = await axios.get(`/api/products/${match.params.id}`);
  //     setOneProduct(data);
  //   };
  //   fetchOneProduct();
  // }, [match]);

  // ****** WITH REACT REDUX ******//
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, oneProduct } = productDetails;
  useEffect(() => {
    dispatch(productDetailsAction(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${valueQuantity}`);
  };
  return (
    <div className="my-5">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={oneProduct.image} alt={oneProduct.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{oneProduct.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={oneProduct.rating} text={`${oneProduct.numReviews} reviews`}></Rating>
              </ListGroup.Item>
              <ListGroup.Item>Price: ${oneProduct.price}</ListGroup.Item>
              <ListGroup.Item>Description: {oneProduct.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${oneProduct.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{oneProduct.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                  </Row>
                </ListGroup.Item>
                {oneProduct.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row className="items-center">
                      <Col>Qty</Col>
                      <Col>
                        <Quantity
                          stockleft={oneProduct.countInStock}
                          valueQuantity={valueQuantity}
                          setValueQuantity={setValueQuantity}
                        />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={oneProduct.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductScreen;
