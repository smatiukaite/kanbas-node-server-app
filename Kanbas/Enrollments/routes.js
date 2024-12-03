import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
    app.post('/api/enrollments', (req, res) => {
        const { userId, courseId } = req.body;
        const enrollment = enrollmentsDao.enrollUserInCourse(userId, courseId);
        res.status(201).json(enrollment);
    });

    app.delete('/api/enrollments/:userId/:courseId', (req, res) => {
        const { userId, courseId } = req.params;
        const status = enrollmentsDao.unenrollUserFromCourse(userId, courseId);
        res.status(200).json(status);
    });

    app.get('/api/enrollments/user/:userId', (req, res) => {
        const { userId } = req.params;
        const enrollments = enrollmentsDao.findCoursesForUser(userId);
        res.status(200).json(enrollments);
    });

    app.get('/api/courses', (req, res) => {
        const courses = coursesDao.findAllCourses();
        res.json(courses);
    });
}
