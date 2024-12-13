import model from "./model.js";

export async function findAllCourses() {
    return await model.find(); // Fetch all courses
}

export async function findCoursesForEnrolledUser(userId) {
    // Assuming you have an `Enrollment` model to handle course-user relationships
    const enrollments = await EnrollmentModel.find({ user: userId });
    const courseIds = enrollments.map((enrollment) => enrollment.course);
    return await model.find({ _id: { $in: courseIds } });
}

export async function createCourse(course) {
    delete course._id; // Remove `_id` if provided
    return await model.create(course);
}

export async function deleteCourse(courseId) {
    return await model.deleteOne({ _id: courseId });
}

export async function updateCourse(courseId, courseUpdates) {
    return await model.updateOne({ _id: courseId }, { $set: courseUpdates });
}
