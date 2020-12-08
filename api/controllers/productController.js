import expressAsyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';

// @route   GET /api/products
// @access  Public
const getProducts = expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});
const test = () => {

    n;
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

// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = expressAsyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(r =>
            r.user.toString() === req.user._id.toString());

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce(
            (acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' });
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
    updateProduct,
    createProductReview
};
