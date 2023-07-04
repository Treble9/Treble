import { Schema, model } from 'mongoose';


// Comment Model
const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
    // Additional comment fields can be added here
}, { timestamps: true });

const Comment = model('Comment', commentSchema);
export default Comment;