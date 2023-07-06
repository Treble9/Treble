import { Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';

const projectSchema = new Schema({
    _id: {
        type: Schema.Types.UUID,
        default: () => randomUUID()
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    milestones: {
        type: [Schema.Types.ObjectId],
        ref: 'Milestone',
    },
    teams: {
        type: [Schema.Types.ObjectId],
        ref: 'Team',
    },
    leads: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },
}, { timestamps: true });


projectSchema.statics.getPermittedTeams = async function (projectId) {
    try {
        const permittedTeams = this.findById(projectId, teams);
        return permittedTeams;
    } catch (error) {
        throw error;
    }
}

const Project = model('Project', projectSchema);
export default Project;
