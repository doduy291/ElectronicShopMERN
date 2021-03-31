import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { getUserDetails, updateUser } from '../../actions/userActions';
import { USER_UPDATE_RESET } from '../../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState('');

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) history.push('/login');
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    }
    if (!user || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, history, user, userId, successUpdate, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };
  return (
    <FormContainer>
      <h1> Edit User </h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message alert="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message alert="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label> Name: </Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label> Email Address: </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="isadmin">
            <Form.Check
              type="checkbox"
              checked={isAdmin}
              label="Is Admin"
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default UserEditScreen;
