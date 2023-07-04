import mongoose, { Schema, model } from "mongoose";

const authSchema = new Schema({
    who: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    secret: {
        type: String,
    }
}, { timestamps: true });



const Auth = model('Auth', authSchema);
export default Auth;