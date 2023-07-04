import { Schema, model } from 'mongoose';

// Task Model
const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    deadline: {
        type: Date,
        required: true,
    }
    // Additional task fields can be added here
}, { timestamps: true });

const Task = model('Task', taskSchema);
export default Task;
