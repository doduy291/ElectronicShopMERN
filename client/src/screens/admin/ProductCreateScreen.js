import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
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
  const [uploading, setUploading] = useState(false);

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
  const createHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct({ name, price, image, brand, category, countInStock, description }));
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
            {/* <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler}></Form.File>
          {uploading && <Loader />} */}
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
