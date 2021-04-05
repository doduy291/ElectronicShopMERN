import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { productDetailsAction, createProductReview } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = ({ match }) => {
  // 'match' object contains information about how a <Route path> matched the URL
  // const product = productsData.find((p) => p._id === match.params.id);

  // ****** WITH REACT STATE ******//

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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { error: errorProducReview, success: successProductReview } = productReviewCreate;

  // ****** WITH REACT STATE ******//
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [valueQuantity, setValueQuantity] = useState(1);
  const incrementQty = () => {
    if (valueQuantity < oneProduct.countInStock) return setValueQuantity(valueQuantity + 1);
    // if (valueQuantity < 50) return setValueQuantity((x) => x + 1); *** With useEffect
  };
  const decreaseQty = () => {
    if (valueQuantity > 1) return setValueQuantity(valueQuantity - 1);
  };
  const changeValueInputQty = (valueInputQty) => {
    return setValueQuantity(valueInputQty);
  };

  useEffect(() => {
    if (successProductReview) {
      alert('Reviewd Successfully');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(productDetailsAction(match.params.id));
  }, [dispatch, match, successProductReview]);

  const reviewHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };
  return (
    <div className="my-5">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message alert="danger">{error}</Message>
      ) : (
        <>
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
                          <div className="component-quantity">
                            <button
                              className="quantity-input__modifier quantity-input__modifier--left"
                              onClick={() => decreaseQty()}
                            >
                              -
                            </button>
                            <input
                              className="quantity-input__screen"
                              type="text"
                              value={valueQuantity}
                              onChange={(e) => changeValueInputQty(e.target.value)}
                            />
                            <button
                              className="quantity-input__modifier quantity-input__modifier--right"
                              onClick={() => incrementQty()}
                            >
                              +
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={oneProduct.countInStock === 0}
                      onClick={() => dispatch(addToCart(oneProduct._id, valueQuantity))}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h3 className="my-4">Reviews</h3>
              {oneProduct.reviews.length === 0 && <Message alert="info"> No Reviews </Message>}
              <ListGroup variant="flush">
                {oneProduct.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating}></Rating>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h3>Write a Customer Review</h3>
                  {errorProducReview && <Message alert="danger">{errorProducReview}</Message>}
                  {userInfo ? (
                    <Form onSubmit={reviewHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as="select" value={rating} onChange={(e) => setRating(e.target.value)}>
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="info">
                        Review
                      </Button>
                    </Form>
                  ) : (
                    <Message alert="info">
                      Please <Link to="/login">Sign In</Link> to review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
