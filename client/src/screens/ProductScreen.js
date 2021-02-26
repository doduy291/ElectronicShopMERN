import React, { useState, useEffect } from 'react';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
// import productsData from '../dev-data/products';
import axios from 'axios';

const ProductScreen = ({ match }) => {
  // 'match' object contains information about how a <Route path> matched the URL
  // const product = productsData.find((p) => p._id === match.params.id);

  // Use React
  const [oneProduct, setOneProduct] = useState({});
  useEffect(() => {
    const fetchOneProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setOneProduct(data);
    };
    fetchOneProduct();
  }, [match]);
  return (
    <div className="my-5">
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
              <ListGroup.Item>
                <Button className="btn-block" type="button" disabled={oneProduct.countInStock === 0}>
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
