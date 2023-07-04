import { serializeUser, deserializeUser, use } from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { join } from 'path';
import { ROLE } from '../middleware/authorizer';

require('dotenv').config();

serializeUser(async (user, next) => {
    const userId = { id: user.id, role: user.role }
    next(null, userId);
})


deserializeUser(async (userId, next) => {
    try {
        switch (userId.role) {
            case ROLE.USER:
                result = await User.findById(userId.id);
                next(null, result);
                break;
            case ROLE.DOCTOR:
                result = await Doctor.findById(userId.id);
                next(null, result);
                break;
            case ROLE.PHARMACIST:
                result = await Pharmacist.findById(userId.id);
                next(null, result);
                break;
            default:
                throw Error('Not Allowed');
        }
    } catch (error) {
        console.log(error);
    }
})


// Sign with plain email
use(
    new localStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
        async (req, email, password, next) => {
            console.log(req.body);
            try {
                switch (req.body.role) {
                    case 'user':
                        result = await User.Login(email, password);
                        next(null, result);
                        break;
                    case 'doctor':
                        result = await Doctor.Login(email, password);
                        next(null, result);
                        break;
                    case 'pharmacist':
                        result = await Pharmacist.Login(email, password);
                        next(null, result);
                        break;
                    default:
                        throw Error('Not Allowed');
                }
            } catch (error) {
                next(error, null);
            }
        }))


