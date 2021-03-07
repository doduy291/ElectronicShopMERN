import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  // ****** WITH REACT STATE ******//
  // const [allProducts, setAllProducts] = useState([]);

  // // Not create async at arrow function in useEffect
  // useEffect(() => {
  //   const fetchAllProducts = async () => {
  //     const { data } = await axios.get('/api/products');
  //     setAllProducts(data);
  //   };
  //   fetchAllProducts();
  // }, []);

  // ****** WITH REDUX ******//
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, allProducts } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Latest Product</h1>
      {loading ? (
        <h1> Loading... </h1>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {allProducts.map((prd) => (
            <Col key={prd._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={prd} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
