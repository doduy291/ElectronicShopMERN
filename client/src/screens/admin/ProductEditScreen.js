import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { productDetailsAction, updateProduct } from '../../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
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

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, oneProduct } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) history.push('/login');
    if (!oneProduct.name || oneProduct._id !== productId) {
      dispatch(productDetailsAction(productId));
    } else {
      setName(oneProduct.name);
      setPrice(oneProduct.price);
      setImage(oneProduct.image);
      setBrand(oneProduct.brand);
      setCategory(oneProduct.category);
      setCountInStock(oneProduct.countInStock);
      setDescription(oneProduct.description);
    }
  }, [dispatch, history, userInfo, oneProduct, productId, successUpdate]);
  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ _id: productId, name, price, image, brand, category, countInStock, description }));
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        'Content-Type': 'multipart/form-data',
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1> Edit Product </h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message alert="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message alert="danger">{error}</Message>
        ) : (
          <Form onSubmit={(e) => updateHandler(e)}>
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
              {uploading && <Loader />}
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
