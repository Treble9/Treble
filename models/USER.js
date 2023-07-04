import { Schema, model } from 'mongoose';
import Auth from './AUTH.js';

// User Model
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        default: "USER",
    }
    // Additional user fields can be added here
}, { timestamps: true });

userSchema.statics.createAccount = async function (email, password) {
    try {
        const newUser = await this.create({ email });
        const createdPassword = await Auth.create({who: newUser._id, secret: password});

    } catch (error) {
        console.log(error)
    }


}

const User = model('User', userSchema);

export default User;
