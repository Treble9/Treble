import { Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';


// Comment Model
const commentSchema = new Schema({
    _id: {
        type: Schema.Types.UUID,
        default: () => randomUUID()
    },
    text: {
        type: String,
        required: true
    },
    taskId: {
        type: Schema.Types.UUID,
        ref: 'Task',
        required: true
    },
    author: {
        type: Schema.Types.UUID,
        required: true,
        ref: 'User',
    }
}, { timestamps: true });

const Comment = model('Comment', commentSchema);
export default Comment;