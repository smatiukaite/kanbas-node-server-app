import courses from "../Database/courses.js";
import Database from "../Database/index.js";
export function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    enrollments.push({ _id: Date.now().toString(), user: userId, course: courseId });
}

export function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = Database;
    Database.enrollments = enrollments.filter(
        (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
    );
    return { status: "success" };
}