import { Schema, model } from 'mongoose';

const organizationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    teams: [{
        type: Schema.Types.ObjectId,
        ref: 'Team',
        default: undefined,
    }],
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project',
        default: undefined,
    }],
}, { timestamps: true });

const Organization = model('Organization', organizationSchema);

export default Organization;
