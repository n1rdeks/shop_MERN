import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { getUserListOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';


const ProfileScreen = ({ history }) => {
    const [messageVariant, setMessageVariant] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const { loading, error, user } = useSelector(state => state.userDetails);
    const { userInfo } = useSelector(state => state.userLogin);
    const { success } = useSelector((state) => state.userUpdateProfile);
    const { error: errorOrders, loading: loadingOrders, orders } =
        useSelector(state => state.orderUserList);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'));
                dispatch(getUserListOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
                dispatch(getUserListOrders());
            }
        }
    }, [dispatch, history, userInfo, user, success]);

    const submitHandler = e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessageVariant('danger');
            setMessage('Passwords do not match');
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }));
            setMessageVariant('success');
            setMessage('Profile updated');
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h2>User profile:</h2>
                {error && <Message variant='danger'>{error}</Message>}
                {message && <Message variant={messageVariant}>{message}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter the Name'
                            value={name} onChange={e => setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email'
                            value={email} onChange={e => setEmail(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter password'
                            value={password} onChange={e => setPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm password'
                            value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">Update</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My orders</h2>
                {loadingOrders ? <Loader /> : errorOrders ?
                    <Message variant="danger">{error}</Message> :
                    (
                        <Table striped bordered hover responsive className="table-sm">
                            <thead>
                                <tr><th>ID</th><th>DATE</th><th>TOTAL</th><th>PAID</th>
                                    <th>DELIVERED</th><th>MORE</th></tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10)
                                            : (<i className="fas fa-times"
                                                style={{ color: "red" }}></i>)}</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10)
                                            : (<i className="fas fa-times"
                                                style={{ color: "red" }}></i>)}</td>
                                        <td>
                                            <LinkContainer to={`/order/${ order._id }`}>
                                                <Button className="btn-sm" variant="light">
                                                    Details
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
            </Col>
        </Row >
    );
};

export default ProfileScreen;
