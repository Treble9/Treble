import express from 'express'
const app = express();
import passport from 'passport';
const { initialize, session } = passport;
import passportConfig from './config/passport-setup.js'
passportConfig(passport);
import cookieSession from 'cookie-session';

import treblle from '@treblle/express';

import dotenv from 'dotenv'
dotenv.config();

// Importing the DB Connection
import dbConnection from './db/connectToDb.js';

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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    treblle({
        apiKey: process.env.TREBLLE_API_KEY,
        projectId: process.env.TREBLLE_PROJECT_ID,
        additionalFieldsToMask: [],
    })
)
app.use(cookieSession({
    maxAge: 60 * 60 * 24 * 1000,
    keys: ["dygf"]
}))
app.use(passport.initialize());
app.use(passport.session());

//work around for passport 0.6.0
app.use(function (request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb()
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb()
        }
    }
    next()
})

import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/api_index.js';

// Authentication Routes
app.use(`${process.env.API_BASE_URL}/auth/`, authRoutes);

// Other Api routes
app.use(`${process.env.API_BASE_URL}/`, apiRoutes);
console.log(`${process.env.API_BASE_URL}/`)


app.get('*', (req, res) => {
    res.status(400).json('404! Page not found')
})