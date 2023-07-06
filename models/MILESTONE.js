import { Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';


const milestoneSchema = new Schema({
    _id: {
        type: Schema.Types.UUID,
        default: () => randomUUID()
    },
    title: {
        type: String,
        required: true
    },
    tasks: {
        type: [Schema.Types.ObjectId],
        ref: 'Project',
        required: true
    },
}, { timestamps: true });

const Milestone = model('Milestone', milestoneSchema);
export default Milestone;
