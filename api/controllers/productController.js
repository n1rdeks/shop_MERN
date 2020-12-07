import expressAsyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';


// @route   GET /api/products
// @access  Public
const getProducts = expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});
const test = () => {

};

// @route   GET /api/products/:id
// @access  Public
const getProductById = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({ message: 'Product deleted' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @route   POST /api/products/
// @access  Private/Admin
const createProduct = expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'
    });

    const result = await product.save();
    res.status(201).json(result);
});

// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;

        const result = await product.save();
        res.json(result);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
};
