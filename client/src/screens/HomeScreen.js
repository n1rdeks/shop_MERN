import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Message from '../components/Message';


const HomeScreen = ({ match }) => {
        const dispatch = useDispatch();
        const searchKeyword = match.params.searchKeyword;
        const pageNumber = match.params.pageNumber || 1;
        const { loading, error, products, page, pages } = useSelector(state => state.productList);

        useEffect(() => {
            dispatch(listProducts(searchKeyword, pageNumber));
        }, [dispatch, searchKeyword, pageNumber]);

        return (
            <>
                <h1>Latest Products</h1>
                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                    <>
                        <Row>
                            {products.map(product => (
                                <Col className="card-group" key={product._id}
                                     sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product}/>
                                </Col>
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages}
                                  searchKeyword={searchKeyword}/>
                    </>
                )}
            </>
        );

    }
;

export default HomeScreen;
