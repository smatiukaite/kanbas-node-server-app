import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
    // Enroll a user in a course
    app.post("/api/enrollments", async (req, res) => {
        const { userId, courseId } = req.body;
        try {
            const enrollment = await enrollmentsDao.enrollUserInCourse(userId, courseId);
            res.status(201).json(enrollment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Unenroll a user from a course
    app.delete("/api/enrollments/:userId/:courseId", async (req, res) => {
        const { userId, courseId } = req.params;
        try {
            const result = await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: "Enrollment not found" });
            }
            res.sendStatus(200);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Get courses a user is enrolled in
    app.get("/api/enrollments/user/:userId", async (req, res) => {
        const { userId } = req.params;
        try {
            const courses = await enrollmentsDao.findCoursesForUser(userId);
            res.json(courses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Get users enrolled in a course
    app.get("/api/enrollments/course/:courseId", async (req, res) => {
        const { courseId } = req.params;
        try {
            const users = await enrollmentsDao.findUsersForCourse(courseId);
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
