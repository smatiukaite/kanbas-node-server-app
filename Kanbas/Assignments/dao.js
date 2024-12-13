import Database from "../Database/index.js";

export function findCourseAssignment(courseID) {
    const { assignments } = Database;
    const courseAssignments = assignments.filter((assignment) => assignment.course == courseID);
    return courseAssignments;
}

export function findAssignmentByID(courseID, assignmentID) {
    const { assignments } = Database;
    const assignment = assignments.find((a) => (a.course === courseID && a._id === assignmentID));
    return assignment;
}

export function deleteAssignment(courseID, assignmentID) {
    const { assignments } = Database;
    Database.assignments = assignments.filter((a) => !(a.course === courseID && a._id === assignmentID));
    return assignments;
}

export function createAssignmetn(newAssignment) {
    const { assignments } = Database;
    assignments.push(newAssignment);
    return assignments;
}

export function updateAssignment(aid, newAssignment) {
    const { assignments } = Database;
    const foundAssignment = assignments.find((a) => (a._id === aid));
    Object.assign(foundAssignment, newAssignment);
    return assignments;
}