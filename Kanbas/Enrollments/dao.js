import courses from "../Database/enrollments.js";
import Database from "../Database/index.js";

export function enrollUserInCourse(userId, courseId) {
    const newEnrollment = { _id: Date.now().toString(), user: userId, course: courseId };
    Database.enrollments.push(newEnrollment);
    return newEnrollment;
}

export function unenrollUserFromCourse(userId, courseId) {
    Database.enrollments = Database.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId)
    );
    return { status: "success" };
}

export function findCoursesForUser(userId) {
    return Database.enrollments.filter((enrollment) => enrollment.user === userId);
}
