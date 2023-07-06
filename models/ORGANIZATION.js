import { Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';


const organizationSchema = new Schema({
    _id: {
        type: Schema.Types.UUID,
        default: () => randomUUID()
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    teams: [{
        type: Schema.Types.UUID,
        ref: 'Team',
        default: undefined,
    }],
    projects: [{
        type: Schema.Types.UUID,
        ref: 'Project',
        default: undefined,
    }],
}, { timestamps: true });

const Organization = model('Organization', organizationSchema);

export default Organization;
