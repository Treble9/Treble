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
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    editors: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    deadline: {
        type: Date,
        required: true,
    },
    // Additional task fields can be added here
}, { timestamps: true });


taskSchema.statics.getEditors = async function (taskId) {
    try {
        const editors = this.findById(taskId, editors);
        return editors;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const Task = model('Task', taskSchema);
export default Task;
