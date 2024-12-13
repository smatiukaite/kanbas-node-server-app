import db from "../Database/index.js";

export default function AssignmentsRoutes(app) {
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = dao.assignments.filter((a) => a.course === cid);
    res.send(assignments);
  });

  app.get("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignments = dao.assignments.filter((a) => a._id === aid);
    res.send(assignments);
  });

  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignmentIndex = dao.assignments.findIndex((a) => a._id === aid);
    dao.assignments[assignmentIndex] = {
      ...dao.assignments[assignmentIndex],
      ...req.body,
    };
    res.sendStatus(204);
  });

  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    dao.assignments.push(newAssignment);
    res.send(newAssignment);
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    dao.assignments = dao.assignments.filter((a) => a._id !== aid);
    res.sendStatus(200);
  });
}