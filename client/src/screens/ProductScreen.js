import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Row, Col, ListGroupItem, Card, Button, Image, Form } from "react-bootstrap";

import Rating from "../components/Rating";
import { productDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";


const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetails);

    useEffect(() => {
        dispatch(productDetails(match.params.id));
    }, [dispatch, match]);

    const addToBasketHandler = () => {
        history.push(`/basket/${match.params.id}?qty=${qty}`);
    };

    return (
        <>
            <Button className="btn-dark" onClick={history.goBack}>Go back</Button>
            {loading ? <Loader /> : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <h3>{product.name}</h3>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Rating
                                        text={` ${product.numReviews} reviews`}
                                        value={product.rating}
                                    />
                                </ListGroupItem>
                                <ListGroupItem>
                                    Description: {product.description}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock > 0 ?
                                                    'In Stock' : 'Out of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroupItem>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control
                                                        as='select'
                                                        value={qty}
                                                        onChange={e => setQty(e.target.value)}>
                                                        {[...Array(product.countInStock).keys()]
                                                            .map(x => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            )
                                                            )}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroupItem>
                                        <Button
                                            className='btn-block'
                                            type='button'
                                            disabled={product.countInStock === 0}
                                            onClick={addToBasketHandler}>
                                            Add to basket
                                    </Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                )}
        </>
    );
};

export default ProductScreen;
