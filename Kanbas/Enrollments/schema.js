import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
    {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel", required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
        grade: { type: Number, default: null }, // Optional field for grade
        letterGrade: { type: String, default: null }, // Optional field for letter grade
        enrollmentDate: { type: Date, default: Date.now }, // Defaults to the current date
        status: {
            type: String,
            enum: ["ENROLLED", "DROPPED", "COMPLETED"],
            default: "ENROLLED", // Default status for new enrollments
        },
    },
    { collection: "enrollments" } // MongoDB collection name
);

export default enrollmentSchema;
