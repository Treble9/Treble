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
    role: {
        type: String,
        required: true,
        default: "",
    }
    // Additional user fields can be added here
}, { timestamps: true });

const User = model('User', userSchema);

export default User;
