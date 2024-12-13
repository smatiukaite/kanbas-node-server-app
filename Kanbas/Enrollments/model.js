import mongoose from "mongoose";
import schema from "./schema.js";

const EnrollmentModel = mongoose.model("Enrollment", schema);
export default EnrollmentModel;
