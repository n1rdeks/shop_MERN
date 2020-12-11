import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import morgan from 'morgan';


dotenv.config();

connectDB();

const PORT = process.env.PORT || 5050;

const app = express();

// added parse request body json
app.use(express.json());

// add for console output requests to API
// (for develop only)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// add static folder '/upload'
// __dirname uses in require import. For emulate this in import ES6 - user this feint
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
