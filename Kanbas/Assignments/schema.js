// import mongoose from "mongoose";

// const assignmentSchema = new mongoose.Schema({
//     title: { type: String, required: true }, // Title of the assignment
//     course: { type: String, required: true }, // Course number as a string
//     until: { type: String }, // Availability date
//     due: { type: String }, // Due date
//     points: { type: String }, // Points for the assignment
//     description: { type: String }, // Description of the assignment
// }, { collection: "assignments" });

// export default assignmentSchema;

import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        course: { type: String, required: true },
        until: { type: String },
        due: { type: String },
        points: { type: String },
        description: { type: String },
    },
    { collection: "assignments" }
);

export default assignmentSchema;
