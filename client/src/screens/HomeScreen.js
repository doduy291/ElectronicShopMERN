import React from 'react';
import { Row, Col } from 'react-bootstrap';
import productsData from '../dev-data/products';
import Product from '../components/Product';

const HomeScreen = () => {
  return (
    <div>
      <h1>Latest Product</h1>
      <Row>
        {productsData.map((prd) => (
          <Col key={prd._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={prd} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeScreen;
