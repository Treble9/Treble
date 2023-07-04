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
    // Additional comment fields can be added here
});

const Comment = model('Comment', commentSchema);
export default Comment;