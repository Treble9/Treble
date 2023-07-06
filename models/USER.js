import { Schema, model } from 'mongoose';
import Auth from './AUTH.js';
import bcrypt from 'bcrypt';
import pkg from 'validator';
const { isEmail } = pkg;
import { randomUUID } from 'crypto';


// User Model
const userSchema = new Schema({
    _id: {
        type: Schema.Types.UUID,
        default: () => randomUUID()
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please provide a valid email address"]
    },
    role: {
        type: String,
        required: true,
        enum: ['485932', '716450', '209743', '562891'],
        default: "485932", //normal user
        // default: "716450", //member
        // default: "209743", //lead
        // default: "562891"  //admin

    },
    verified: {
        type: Boolean,
        default: false,
        select: false,
    },
    organization: {
        type: Schema.Types.UUID,
        ref: 'Organization'
    },
    team: {
        type: [Schema.Types.ObjectId],
        ref: 'Team',
        select: false,
        default: undefined
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
}, { timestamps: true });

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

userSchema.statics.CreateAccount = async function (email, password) {
    console.log(email, password)
    try {
        const newUser = await this.create({ email });
        const createdPassword = await Auth.create({ who: newUser._id, secret: password });
        return newUser;
    } catch (error) {
        throw error;
    }
}

userSchema.statics.Login = async function (email, password) {
    try {
        const foundUser = await this.findOne({ email });
        const secretPlace = await Auth.findOne({ who: foundUser._id });
        console.log("to be compared", password, secretPlace)
        const isValid = await bcrypt.compare(password, secretPlace.secret);
        if (isValid) {
            return foundUser;
        }
        throw new Error('Incorrect Password');
    } catch (error) {
        throw error;
    }
}

userSchema.statics.isOrganizationEmployee = async function (userId, organizationId) {
    try {
        const userOrganization = await this.findById(userId, organization);
        if (organizationId == userOrganization) {
            return true
        }
        return false
    } catch (error) {
        throw error;
    }
}

userSchema.statics.getUserTeams = async function (userId) {
    try {
        const userTeams = await this.findById(userId, team);
    } catch (error) {
        throw error;
    }
}

const User = model('User', userSchema);

export default User;
