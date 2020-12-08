import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';


const PlaceOrderScreen = ({ history }) => {
    const basket = useSelector(state => state.basket);
    const { order, error, success } = useSelector(state => state.orderCreate);
    const dispatch = useDispatch();

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`);
        }
        // eslint-disable-next-line
    }, [history, success]);

    // calculate
    basket.itemsPrice = Number(basket.basketItems.reduce(
        (acc, item) => acc + item.price * item.qty, 0)).toFixed(2);

    // shipping fu calculate
    if (basket.itemsPrice > 100) {
        basket.shippingPrice = Number(0).toFixed(2);
    } else if (basket.itemsPrice > 0) {
        basket.shippingPrice = Number(50).toFixed(2);
    } else {
        basket.shippingPrice = Number(0).toFixed(2);
    }

    // tax - 15% maybe...
    basket.taxPrice = (0.15 * Number(basket.itemsPrice)).toFixed(2);

    basket.totalPrice = (Number(basket.itemsPrice) + Number(basket.shippingPrice)
        + Number(basket.taxPrice)).toFixed(2);

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: basket.basketItems,
            shippingAddress: basket.shippingAddress,
            paymentMethod: basket.paymentMethod,
            itemsPrice: basket.itemsPrice,
            taxPrice: basket.taxPrice,
            totalPrice: basket.totalPrice
        }));
    };

    return (
        <>
            <CheckoutSteps step1
                           step2
                           step3/>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Address:&nbsp;</strong>
                                {basket.shippingAddress.address},&nbsp;
                                {basket.shippingAddress.city}&nbsp;
                                {basket.shippingAddress.postalCode},&nbsp;
                                {basket.shippingAddress.country}.
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment method</h2>
                            <strong>Method:&nbsp;</strong>
                            {basket.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order items</h2>
                            {basket.basketItems.length === 0 ?
                                <Message>Your basket is empty</Message> : (
                                    <ListGroup variant="flush">
                                        {basket.basketItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image}
                                                               alt={item.name}
                                                               fluid
                                                               rounded/>
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.productId}`}>
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
                                    <Col>${basket.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${basket.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${basket.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${basket.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type="button"
                                        className="btn-block"
                                        disabled={basket.basketItems.length === 0}
                                        onClick={placeOrderHandler}>
                                    Place order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
