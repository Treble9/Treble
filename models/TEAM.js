import { Schema, model } from 'mongoose';

const teamSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    projects: [{
        type: _Schema.Types.ObjectId,
        ref: 'Project'
    }],
}, { timestamps: true });

const Team = model('Team', teamSchema);

export default Team;
