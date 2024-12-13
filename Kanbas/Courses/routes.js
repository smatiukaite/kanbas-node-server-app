import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";

export default function CourseRoutes(app) {
    // Get all courses
    app.get("/api/courses", async (req, res) => {
        try {
            const courses = await dao.findAllCourses();
            res.json(courses); // Respond with the list of courses
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Get modules for a course
    app.get("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        try {
            const modules = await modulesDao.findModulesForCourse(courseId);
            res.json(modules);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Create a module for a course
    app.post("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const module = { ...req.body, course: courseId };
        try {
            const newModule = await modulesDao.createModule(module);
            res.status(201).json(newModule);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Create a new course
    app.post("/api/courses", async (req, res) => {
        try {
            const newCourse = await dao.createCourse(req.body);
            res.status(201).json(newCourse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Delete a course
    app.delete("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        try {
            const result = await dao.deleteCourse(courseId);
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: "Course not found" });
            }
            res.sendStatus(200);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Update a course
    app.put("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        try {
            const updatedCourse = await dao.updateCourse(courseId, courseUpdates);
            if (!updatedCourse.matchedCount) {
                return res.status(404).json({ error: "Course not found" });
            }
            res.json(updatedCourse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}