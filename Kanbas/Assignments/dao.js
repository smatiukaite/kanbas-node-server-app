import model from "./model.js";

export async function findCourseAssignment(courseID) {
    return await model.find({ course: courseID });
}

export async function findAssignmentByID(assignmentID) {
    return await model.findById(assignmentID);
}

export async function deleteAssignment(assignmentID) {
    return await model.deleteOne({ _id: assignmentID });
}

export async function createAssignment(newAssignment) {
    return await model.create(newAssignment);
}

export async function updateAssignment(aid, newAssignment) {
    return await model.findByIdAndUpdate(
        aid,
        newAssignment,
        { new: true } // Return the updated document
    );
}

export async function findAllAssignments() {
    return await model.find();
}
