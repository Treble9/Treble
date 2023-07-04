import { Schema, model } from 'mongoose';


// Project Model
const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    // Additional project fields can be added here
});

const Project = model('Project', projectSchema);
export default Project;
