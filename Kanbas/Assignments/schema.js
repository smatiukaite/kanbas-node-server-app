import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema({
    // title: String,
    // course: String,
    // until: Date,
    // due: Date,
    // points: String,
    // description: String,  
    title: { type: String, required: true }, // The title of the assignment
    course: { type: String, required: true }, // The course ID associated with the assignment
    until: { type: Date }, // The date until which the assignment is available
    due: { type: Date }, // The due date of the assignment
    points: { type: Number }, // The total points for the assignment
    description: { type: String },
},
    { collection: "assignments" }
);
export default assignmentSchema;