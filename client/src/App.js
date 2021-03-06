import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import BasketScreen from './screens/BasketScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';


function App () {
    return (
        <Router>
            <Header/>
            <main className="py-3">
                <Container>
                    <Route path="/login" component={LoginScreen}/>
                    <Route path="/payment" component={PaymentScreen}/>
                    <Route path="/placeOrder" component={PlaceOrderScreen}/>
                    <Route path="/register" component={RegisterScreen}/>
                    <Route path="/profile" component={ProfileScreen}/>
                    <Route path="/product/:id" component={ProductScreen}/>
                    <Route path="/order/:id" component={OrderScreen}/>
                    <Route path="/basket/:id?" component={BasketScreen}/>
                    <Route path="/shipping" component={ShippingScreen}/>
                    <Route path="/admin/userList" component={UserListScreen}/>
                    <Route path="/admin/orderList" component={OrderListScreen}/>
                    <Route path="/admin/user/:id/edit" component={UserEditScreen}/>
                    <Route path="/admin/productList" component={ProductListScreen} exact/>
                    <Route path="/admin/productList/:pageNumber"
                           component={ProductListScreen} exact/>
                    <Route path="/admin/product/:id/edit" component={ProductEditScreen}/>
                    <Route path="/search/:searchKeyword" component={HomeScreen} exact/>
                    <Route path="/page/:pageNumber" component={HomeScreen} exact/>
                    <Route path="/search/:searchKeyword/page/:pageNumber"
                           component={HomeScreen} exact/>
                    <Route path="/" component={HomeScreen} exact/>
                </Container>
            </main>
            <Footer/>
        </Router>
    );
}

export default App;
