import { Schema, model } from 'mongoose';
import Auth from './AUTH.js';
import bcrypt from 'bcrypt';

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
        default: "485932",
    },
    verified: {
        type: Boolean,
        default: false
    },
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization'
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }
}, { timestamps: true });

userSchema.statics.CreateAccount = async function (email, password) {
    console.log(email, password)
    try {
        const newUser = await this.create({ email });
        const createdPassword = await Auth.create({ who: newUser._id, secret: password });
        return newUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

userSchema.statics.Login = async function (email, password) {
    try {
        const foundUser = await this.findOne({ email });
        const secretPlace = await Auth.findOne({who: foundUser._id});
        console.log("to be compared", password, secretPlace)
        const isValid = await bcrypt.compare(password, secretPlace.secret);
        if(isValid){
            return foundUser;
        }
        throw new Error('Incorrect Password');
    } catch (error) {
        console.log(error);
        throw error;
    }
}
const User = model('User', userSchema);

export default User;
