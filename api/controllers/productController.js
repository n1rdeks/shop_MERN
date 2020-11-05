import expressAsyncHandler from "express-async-handler";

import Product from "../models/productModel.js";


// @route   GET /api/products
// @access  Public
const getProducts = expressAsyncHandler( async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});


// @route   GET /api/products/:id
// @access  Public
const getProductById = expressAsyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export {
    getProducts,
    getProductById
};
