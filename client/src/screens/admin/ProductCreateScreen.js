import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { createProduct } from '../../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants';

const ProductCreateScreen = ({ match, history }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(1);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(1);
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo || !userInfo.isAdmin) history.push('/login');
    if (successCreate) {
      setName('');
      setPrice(1);
      setImage('');
      setBrand('');
      setCategory('');
      setCountInStock(1);
      setDescription('');
    }
  }, [dispatch, history, successCreate, userInfo]);
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image-file', file);
    try {
      const config = {
        'Content-Type': 'multipart/form-data',
      };
      const { data } = await axios.post('/api/upload/', formData, config);
      setImage(data);
    } catch (error) {
      console.log(error);
    }
  };
  const createHandler = (e) => {
    e.preventDefault();
    const formDataCreate = new FormData();
    formDataCreate.append('image-file', document.querySelector('#image-file').files[0]);
    formDataCreate.append('image', image);
    formDataCreate.append('name', name);
    formDataCreate.append('price', price);
    formDataCreate.append('brand', brand);
    formDataCreate.append('category', category);
    formDataCreate.append('countInStock', countInStock);
    formDataCreate.append('description', description);
    dispatch(createProduct(formDataCreate));
  };
  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1> Create Product </h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message alert="danger">{errorCreate}</Message>}

        <Form onSubmit={(e) => createHandler(e)}>
          <Form.Group controlId="name">
            <Form.Label> Name: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label> Price: </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price..."
              value={price}
              onChange={(e) => setPrice(e.target.value < 1 ? 1 : e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="brand">
            <Form.Label> Brand: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Brand..."
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label> Category: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="countInStock">
            <Form.Label> Count In Stock: </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Count..."
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value < 1 ? 1 : e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label> Description: </Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler}></Form.File>
          </Form.Group>
          <Button type="submit" variant="primary">
            Create
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductCreateScreen;
