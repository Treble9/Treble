import { Schema, model } from 'mongoose';

// User Model
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Additional user fields can be added here
});

const User = model('User', userSchema);

export default User;
