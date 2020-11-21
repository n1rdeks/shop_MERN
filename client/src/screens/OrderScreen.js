import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderActions';


const OrderScreen = ({ match }) => {
    const orderId = match.params.id;
    const { order, loading, error } = useSelector(state => state.orderDetails);
    const dispatch = useDispatch();

    if (!loading) {
        order.itemsPrice = Number(order.orderItems.reduce(
            (acc, item) => acc + item.price * item.qty, 0)).toFixed(2);
    }

    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    }, [dispatch, orderId]);

    return (loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name:&nbsp;</strong>{order.user.name}</p>
                            <p><strong>Email:&nbsp;</strong>
                                <a href={`mailto:${ order.user.email }`}>{order.user.email}</a>
                            </p>
                            <p><strong>Address:&nbsp;</strong>
                                {order.shippingAddress.address},&nbsp;
                                {order.shippingAddress.city}&nbsp;
                                {order.shippingAddress.postalCode},&nbsp;
                                {order.shippingAddress.country}.
                            </p>
                            {order.isDelivered ? <Message variant="success">Delivered on
                            {order.deliveredAt}</Message> : <Message variant="danger">
                                    Not Delivered</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment method</h2>
                            <p>
                                <strong>Method:&nbsp;</strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message> :
                                <Message variant="danger">Not paid</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order items</h2>
                            {order.orderItems.length === 0 ?
                                <Message>Order is empty</Message> : (
                                    <ListGroup variant="flush">
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name}
                                                            fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${ item.productId }`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = ${item.qty *
                                                            item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default OrderScreen;