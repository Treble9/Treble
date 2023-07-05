import { Schema, model } from 'mongoose';


// Milestone Model
const milestoneSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    tasks: {
        type: [Schema.Types.ObjectId],
        ref: 'Project',
        required: true
    },
    
    // Additional milestone fields can be added here
}, {timestamps: true});

const Milestone = model('Milestone', milestoneSchema);
export default Milestone;
