import * as dao from "./dao.js";

export default function AssignmentsRoutes(app) {
    // Get all assignments
    app.get("/api/assignments", async (req, res) => {
        try {
            const assignments = await dao.findAllAssignments();
            res.json(assignments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Get assignments for a specific course
    app.get("/api/courses/:cid/assignments", async (req, res) => {
        const { cid } = req.params;
        try {
            const assignments = await dao.findCourseAssignment(cid);
            res.json(assignments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Get a specific assignment by ID
    app.get("/api/assignments/:aid", async (req, res) => {
        const { aid } = req.params;
        try {
            const assignment = await dao.findAssignmentByID(aid);
            if (!assignment) {
                return res.status(404).json({ error: "Assignment not found" });
            }
            res.json(assignment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Create a new assignment
    app.post("/api/courses/:cid/assignments", async (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
        };
        try {
            const createdAssignment = await dao.createAssignment(newAssignment);
            res.status(201).json(createdAssignment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Update an assignment
    app.put("/api/assignments/:aid", async (req, res) => {
        const { aid } = req.params;
        try {
            const updatedAssignment = await dao.updateAssignment(aid, req.body);
            if (!updatedAssignment) {
                return res.status(404).json({ error: "Assignment not found" });
            }
            res.json(updatedAssignment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Delete an assignment
    app.delete("/api/assignments/:aid", async (req, res) => {
        const { aid } = req.params;
        try {
            const result = await dao.deleteAssignment(aid);
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: "Assignment not found" });
            }
            res.sendStatus(200);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
