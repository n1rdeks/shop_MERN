import dotenv from 'dotenv';

import Product from "./models/productModel.js";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";


dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map(prod => {
            return {...prod, user: adminUser};
        });

        await Product.insertMany(sampleProducts);

        console.log('data imported to DB');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};


const deleteData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('data destroyed');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};


if(process.argv[2] === '-d'){
    deleteData();
} else {
    importData();
}
