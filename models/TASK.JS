import { Schema, model } from 'mongoose';

// Task Model
const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    // Additional task fields can be added here
});

const Task = model('Task', taskSchema);
export default Task;
