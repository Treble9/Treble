
import { Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';

// File Model
const fileSchema = new Schema({
    _id: {
        type: Schema.Types.UUID,
        default: () => randomUUID()
    },
    name: {
        type: String,
        required: true
    },
    taskId: {
        type: Schema.Types.UUID,
        ref: 'Task',
        required: true
    },
}, { timestamps: true });


const File = model('File', fileSchema);
export default File;

