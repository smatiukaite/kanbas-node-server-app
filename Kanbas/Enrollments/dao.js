import courses from "../Database/enrollments.js";
import Database from "../Database/index.js";
import model from "./model.js";

export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}

export function enrollUserInCourse(user, course) {
    return model.create({ user, course });
}

export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}

// export function enrollUserInCourse(userId, courseId) {
//     const newEnrollment = { _id: Date.now().toString(), user: userId, course: courseId };
//     Database.enrollments.push(newEnrollment);
//     return newEnrollment;
// }

// export function unenrollUserFromCourse(userId, courseId) {
//     Database.enrollments = Database.enrollments.filter(
//         (e) => !(e.user === userId && e.course === courseId)
//     );
//     return { status: "success" };
// }

// export function findCoursesForUser(userId) {
//     return Database.enrollments.filter((enrollment) => enrollment.user === userId);
// }