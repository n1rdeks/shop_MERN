import express from 'express';
import dotenv from 'dotenv';

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";


dotenv.config();
connectDB();

const PORT = process.env.PORT || 5050;

const  app = express();


app.use('/api/products', productRoutes);


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

