import { Schema, model } from "mongoose";
import { randomUUID } from 'crypto';


const reportSchema = new Schema({
    _id: {
        type: Schema.Types.UUID,
        default: () => randomUUID()
    },
    name: {
        type: String,
        required: true
    }
})


const Report = model('Report', reportSchema);
export default Report;