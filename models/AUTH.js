import { Schema, model } from "mongoose";
import { genSalt, hash } from 'bcrypt';

const authSchema = new Schema({
    who: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    secret: {
        type: String,
    }
}, { timestamps: true });


authSchema.pre('save', async function (next) {
    try {
        const salt = await genSalt();
        this.secret = await hash(this.secret, salt);
        console.log(this.secret)
        next();
    } catch (error) {
        console.log(error);
        throw error('Something Wrong Happened');
    }
});


const Auth = model('Auth', authSchema);
export default Auth;