import { Schema, model } from "mongoose";

const reportSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})


const Report = model('Report', reportSchema);
export default Report;