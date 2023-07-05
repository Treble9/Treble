import { connect } from 'mongoose';

const options = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}

const dbConnection = (url) => connect(url, options);

export default dbConnection;