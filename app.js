import express from 'express'
const app = express();
import treblle from '@treblle/express';

import dotenv from 'dotenv'
dotenv.config();

// Importing the DB Connection
import dbConnection  from './db/connectToDb.js';

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

// Initializing the middlewares
app.use(
    treblle({
        apiKey: process.env.TREBLLE_API_KEY,
        projectId: process.env.TREBLLE_PROJECT_ID,
        additionalFieldsToMask: [],
    })
)

import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/api/index.js';

// Authentication Routes
app.use('/${process.env.API_BASE_URL}/auth', authRoutes);
// Other Api routes
app.use('/${process.env.API_BASE_URL}', apiRoutes);



app.get('*', (req, res) => {
    res.status(400).json('404! Page not found')
})