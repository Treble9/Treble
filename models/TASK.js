import { Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';

const taskSchema = new Schema({
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
}, { timestamps: true });


taskSchema.statics.getEditors = async function (taskId) {
    try {
        const editors = this.findById(taskId, editors);
        return editors;
    } catch (error) {
        throw error;
    }
}

const Task = model('Task', taskSchema);
export default Task;
