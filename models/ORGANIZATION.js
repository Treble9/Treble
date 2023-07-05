import { Schema, model } from 'mongoose';

const organizationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    teams: [{
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }],
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Organization = model('Organization', organizationSchema);

export default Organization;
