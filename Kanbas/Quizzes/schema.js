import mongoose from "mongoose";
const quizzesSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    until: Date,
    due: Date,
    points: Number,
    role: {
        type: String,
        enum: ["STUDENT", "FACULTY", "ADMIN"],
        default: "STUDENT",
    },
    loginId: String,
    section: String,
    lastActivity: Date,
    totalActivity: String,
},
    { collection: "quizzes" }
);
export default userSchema;