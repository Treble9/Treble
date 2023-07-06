import { Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';

const teamSchema = new Schema({
    _id: {
        type: Schema.Types.UUID,
        default: () => randomUUID()
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    lead: {
        type: Schema.Types.UUID,
        ref: 'User'
    },
    members: [{
        type: Schema.Types.UUID,
        ref: 'User'
    }],
    projects: [{
        type: _Schema.Types.ObjectId,
        ref: 'Project'
    }],
}, { timestamps: true });

const Team = model('Team', teamSchema);

export default Team;
