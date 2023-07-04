
import { Schema, model } from 'mongoose';


// Milestone Model
const milestoneSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    // Additional milestone fields can be added here
});

const Milestone = model('Milestone', milestoneSchema);
export default Milestone;
