import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';

import { addToBasket, removeFromBasket } from '../actions/basketActions';
import Message from '../components/Message';


const BasketScreen = ({ match, location, history }) => {
    const productId = match.params.id;
    // in GET request MAYBE! we need found ?qty=Num and take Num
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    const { basketItems } = useSelector(state => state.basket);
    const subtotal = basketItems.reduce((acc, item) => acc + item.qty, 0);
    const sum = basketItems.reduce((acc, item) => acc + item.qty*item.price, 0).toFixed(2);

    useEffect(() => {
        if (productId) {
            dispatch(addToBasket(productId, qty));
        }
    }, [dispatch, qty, productId]);

    const removeFromBasketHandler = id => {
        dispatch(removeFromBasket(id));
    };

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    };

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Basket</h1>
                {basketItems.length === 0 ? (
                    <Message>
                        Your basket is empty&nbsp;&nbsp;<Link to="/">Go back</Link>
                    </Message>
                ) : (
                        <ListGroup variant='flush'>
                            {basketItems.map(item => (
                                <ListGroup.Item key={item.productId}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name}
                                                fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.productId}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={2}>{item.price}</Col>
                                        <Col md={2}>
                                            <Form.Control
                                                as='select'
                                                value={item.qty}
                                                onChange={e => dispatch(addToBasket(item.productId,
                                                    Number(e.target.value)))}>
                                                {[...Array(item.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                )
                                                )}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="button" variant="light"
                                                onClick={() => removeFromBasketHandler(item.productId)}>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Subtotal: ({subtotal}) {subtotal <= 1 ? 'item' : 'items'}</h2>
                            ${sum}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className="btn-block"
                                    disabled={basketItems.length === 0}
                                    onClick={checkoutHandler}>
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default BasketScreen;
