import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Row, Col, ListGroupItem, Card, Button, Image } from "react-bootstrap";

import Rating from "../components/Rating";
import { productDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({ match }) => {
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(state => state.productDetails);

    useEffect(() => {
        dispatch(productDetails(match.params.id));
    }, [dispatch, match]);

    return (
        <>
            <Link className="btn btn-dark my-3" to="/">Go Back</Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h3>{product.name}</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating text={` ${product.numReviews} reviews`}
                                    value={product.rating} />
                            </ListGroupItem>
                            <ListGroupItem>
                                Description: {product.description}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            Price:
                                    </Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            Status:
                                    </Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Button className="btn-block" type="button"
                                        disabled={product.countInStock === 0}>
                                        Add to card
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
