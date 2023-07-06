import express from 'express'
const app = express();
import passport from 'passport';
import passportConfig from './config/passport-setup.js'
passportConfig(passport);
import cookieSession from 'cookie-session';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean'
import ExpressMongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
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
            console.log(`Visit http://${process.env.HOST}:${process.env.PORT}/${process.env.API_BASE_URL}`);
        })
    } catch (error) {
        console.log(error)
    }
})()

// Initializing the middlewares
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: "Error",
        "message": "You have exceeded the allowed rate limit for this endpoint. Please try again in an hour."
    }
})

app.use(helmet());
// Apply the rate limiting middleware to ohly Api route
app.use(`/${process.env.API_BASE_URL}/`, limiter);
// Data sanitize against NoSQL Query injection
app.use(ExpressMongoSanitize());

// Prevent Parameter Pollution
app.use(hpp({
    // whitelist: [] //pass the parameter you want to omit
}))
app.use(xss());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10kb' }));
app.use(
    treblle({
        apiKey: process.env.TREBLLE_API_KEY,
        projectId: process.env.TREBLLE_PROJECT_ID,
        additionalFieldsToMask: [],
    })
)
app.use(cookieSession({
    maxAge: 60 * 60 * 24 * 1000,
    keys: [process.env.COOKIE_SECRET]
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
app.use(`/${process.env.API_BASE_URL}/auth/`, authRoutes);

// Other Api routes
app.use(`/${process.env.API_BASE_URL}/`, apiRoutes);


app.get('*', (req, res) => {
    res.status(400).json('404! Page not found')
})