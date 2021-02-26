import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
  const [allProducts, setAllProducts] = useState([]);

  // Not create async at arrow function in useEffect
  useEffect(() => {
    const fetchAllProducts = async () => {
      const { data } = await axios.get('/api/products');
      setAllProducts(data);
    };
    fetchAllProducts();
  });
  return (
    <div>
      <h1>Latest Product</h1>
      <Row>
        {allProducts.map((prd) => (
          <Col key={prd._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={prd} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeScreen;
