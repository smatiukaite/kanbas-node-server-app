import model from "./model.js";

export async function findCoursesForUser(userId) {
    // Find enrollments for the user and populate the course details
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
    // Find enrollments for the course and populate the user details
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}

export async function enrollUserInCourse(userId, courseId) {
    // Create a new enrollment
    const enrollment = await model.create({
        user: userId,
        course: courseId,
        enrollmentDate: new Date(),
    });
    return enrollment;
}

export async function unenrollUserFromCourse(userId, courseId) {
    // Delete the enrollment for the given user and course
    const result = await model.deleteOne({ user: userId, course: courseId });
    return result;
}
