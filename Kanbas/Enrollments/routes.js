import * as enrollmentsDao from "./enrollmentsDao.js";

export default function EnrollmentRoutes(app) {
    app.post("/api/enrollments", async (req, res) => {
        const { userId, courseId } = req.body;
        const enrollment = await enrollmentsDao.enrollUserInCourse(userId, courseId);
        res.send(enrollment);
    });

    app.delete("/api/enrollments", async (req, res) => {
        const { userId, courseId } = req.body;
        const status = await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
        res.send(status);
    });
}
