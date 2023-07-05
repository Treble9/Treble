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
        type: [ Schema.Types.ObjectId ],
        ref: 'Milestone',
    }
    // Additional project fields can be added here
}, { timestamps: true });

const Project = model('Project', projectSchema);
export default Project;
