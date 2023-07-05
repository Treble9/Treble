import { Schema, model } from 'mongoose';


// Project Model
const projectSchema = new Schema({
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
    }
    // Additional project fields can be added here
}, { timestamps: true });


projectSchema.statics.getPermittedTeams = async function (projectId) {
    try {
        const permittedTeams = this.findById(projectId, teams);
        return permittedTeams;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



const Project = model('Project', projectSchema);
export default Project;
