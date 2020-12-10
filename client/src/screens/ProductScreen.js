import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Row, Col, ListGroupItem, Card, Button, Image, Form } from 'react-bootstrap';

import Rating from '../components/Rating';
import { productDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';


const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { userInfo } = useSelector((state) => state.userLogin);
    const {
        success: successReview,
        error: errorReview
    } = useSelector((state) => state.productReviewCreate);

    useEffect(() => {
        if (successReview) {
            alert('Review submitted!');
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(productDetails(match.params.id));
    }, [dispatch, match, successReview]);

    const addToBasketHandler = () => {
        history.push(`/basket/${match.params.id}?qty=${qty}`);
    };

    const submitHandler = e => {
        e.preventDefault();
        dispatch(createProductReview(match.params.id, { rating, comment }));
    };

    return (
        <>
            <Button className="btn-dark my-2"
                    onClick={history.goBack}>Go back</Button>
            {loading ? <Loader/> : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        <Col md={6}>
                            <Image src={product.image}
                                   alt={product.name}
                                   fluid/>
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
                                                                    <option key={x + 1}
                                                                            value={x + 1}>
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
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && <Message>No reviews</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map(review => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating}
                                                text={''}/>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroupItem>
                                    <h2>Write a Customer Review</h2>
                                    {errorReview && (
                                        <Message variant={'danger'}>{errorReview}</Message>)}
                                    {userInfo ? (<Form onSubmit={submitHandler}>
                                        <Form.Group controlId={'rating'}>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control as={'select'}
                                                          value={rating}
                                                          onChange={e => setRating(e.target.value)}>
                                                <option value={''}>Select...</option>
                                                <option value={'1'}>1 - Poor</option>
                                                <option value={'2'}>1 - Fair</option>
                                                <option value={'3'}>1 - Good</option>
                                                <option value={'4'}>1 - Very Good</option>
                                                <option value={'5'}>1 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId={'comment'}>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control as={'textarea'}
                                                          row={'3'}
                                                          value={comment}
                                                          onChange={e => setComment(e.target.value)}>
                                            </Form.Control>
                                        </Form.Group>
                                        <Button type={'submit'}
                                                variant={'primary'}>Submit</Button>
                                    </Form>) : <Message>
                                        Please <Link to={'/login'}>sign in</Link> to write a review
                                    </Message>}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductScreen;
