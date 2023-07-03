import express from 'express'
const app = express();

import dotenv from 'dotenv'
dotenv.config();

// Importing the DB Connection
import { dbConnection } from './db/connectToDb';

const PORT = process.env.PORT || 4000;


(async () => {
    try {
        await dbConnection(process.env.MONGODB_URI);
        console.log("DB instance initialized and connected to!");
        app.listen(PORT, () => {
            console.log('Now listening for requests');
            console.log(`Visit http://${process.env.HOST}:${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
})()




import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/api/';

// Authentication Routes
app.use('/${process.env.API_BASE_URL}/auth', authRoutes);
// Other Api routes
app.use('/${process.env.API_BASE_URL}', apiRoutes);



app.get('*', (req, res) => {
    res.status(400).json('404! Page not found')
})