
import { Schema, model } from 'mongoose';


// File Model
const fileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    // Additional file fields can be added here
}, {timestamps: true});


const File = model('File', fileSchema);
export default File;

