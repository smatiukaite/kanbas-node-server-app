// import * as dao from "./dao.js";
// import * as courseDao from "../Courses/dao.js";
// import * as enrollmentsDao from "../Enrollments/dao.js";

// export default function UserRoutes(app) {
//     //UPDATE USER
//     const updateUser = async (req, res) => {
//         const { userId } = req.params;
//         const userUpdates = req.body;
//         await dao.updateUser(userId, userUpdates);
//         const currentUser = req.session["currentUser"];
//         if (currentUser && currentUser._id === userId) {
//             req.session["currentUser"] = { ...currentUser, ...userUpdates };
//         }

//         res.json(currentUser);
//     };
//     app.put("/api/users/:userId", updateUser);

//     //SIGN USER UP
//     const signup = async (req, res) => {
//         const user = await dao.findUserByUsername(req.body.username);
//         if (user) {
//             res.status(400).json(
//                 { message: "Username already in use" });
//             return;
//         }
//         const currentUser = await dao.createUser(req.body);
//         req.session["currentUser"] = currentUser;
//         res.json(currentUser);
//     };
//     app.post("/api/users/signup", signup);

//     //SIGN USER IN
//     const signin = async (req, res) => {
//         const { username, password } = req.body;
//         const currentUser = await dao.findUserByCredentials(username, password);
//         if (currentUser) {
//             req.session["currentUser"] = currentUser;
//             res.json(currentUser);
//         } else {
//             res.status(401).json({ message: "Unable to login. Try again later." });
//         }

//     };
//     app.post("/api/users/signin", signin);

//     //SIGN USER OUT
//     const signout = async (req, res) => {
//         req.session.destroy();
//         res.sendStatus(200);
//     };
//     app.post("/api/users/signout", signout);

//     //PROFILE
//     const profile = async (req, res) => {
//         const currentUser = req.session["currentUser"];
//         if (!currentUser) {
//             res.sendStatus(401);
//             return;
//         }
//         res.json(currentUser);
//     };
//     app.post("/api/users/profile", profile);

//     //FIND ALL USERS
//     const findAllUsers = async (req, res) => {
//         const { role, name } = req.query;

//         if (role) {
//             const users = await dao.findUsersByRole(role);
//             res.json(users);
//             return;
//         }

//         if (name) {
//             const users = await dao.findUsersByPartialName(name);
//             res.json(users);
//             return;
//         }

//         const users = await dao.findAllUsers();
//         res.json(users);
//     };
//     app.get("/api/users", findAllUsers);

//     //FIND USER BY ID
//     const findUserById = async (req, res) => {
//         const user = await dao.findUserById(req.params.userId);
//         res.json(user);
//     };
//     app.get("/api/users/:userId", findUserById);

//     //FIND COURSES A USER ENROLLED
//     // const findCoursesForEnrolledUser = async (req, res) => {
//     //     let { userId } = req.params;
//     //     if (userId === "current") {
//     //         const currentUser = req.session["currentUser"];
//     //         if (!currentUser) {
//     //             res.sendStatus(401);
//     //             return;
//     //         }
//     //         userId = currentUser._id;
//     //     }
//     //     const courses = await courseDao.findCoursesForEnrolledUser(userId);
//     //     res.json(courses);
//     // };
//     // app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

//     //FIND COURSES FOR USER 
//     const findCoursesForUser = async (req, res) => {
//         const currentUser = req.session["currentUser"];
//         if (!currentUser) {
//             res.sendStatus(401);
//             return;
//         }
//         if (currentUser.role === "ADMIN" || currentUser.ROLE === "FACULTY") {
//             const courses = await courseDao.findAllCourses();
//             res.json(courses);
//             return;
//         }
//         let { uid } = req.params;
//         if (uid === "current") {
//             uid = currentUser._id;
//         }
//         const courses = await enrollmentsDao.findCoursesForUser(uid);
//         res.json(courses);
//     };
//     app.get("/api/users/:uid/courses", findCoursesForUser);

//     //CREATE A COURSE
//     const createCourse = async (req, res) => {
//         const currentUser = req.session["currentUser"];
//         const newCourse = await courseDao.createCourse(req.body);
//         await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
//         res.json(newCourse);
//     };
//     app.post("/api/users/current/courses", createCourse);

//     //DELETE A USER FROM DB
//     const deleteUser = async (req, res) => {
//         const status = await dao.deleteUser(req.params.userId);
//         res.json(status);
//     }
//     app.delete("/api/users/:userId", deleteUser);

//     //CREATE A USER
//     const createUser = async (req, res) => {
//         const user = await dao.createUser(req.body);
//         res.json(user);
//     };
//     app.post("/api/users", createUser);

//     //ENROLL USER INTO A COURSE
//     const enrollUserInCourse = async (req, res) => {
//         let { uid, cid } = req.params;
//         if (uid === "current") {
//             const currentUser = req.session["currentUser"];
//             uid = currentUser._id;
//         }
//         const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
//         res.send(status);
//     };
//     app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);

//     //UNENROLL USER FROM A COURSE
//     const unenrollUserFromCourse = async (req, res) => {
//         let { uid, cid } = req.params;
//         if (uid === "current") {
//             const currentUser = req.session["currentUser"];
//             uid = currentUser._id;
//         }
//         const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
//         res.send(status);
//     };
//     app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);

// }

import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
    // Update User
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const userUpdates = req.body;
        const updatedUser = await dao.updateUser(userId, userUpdates);

        const currentUser = req.session["currentUser"];
        if (currentUser && currentUser._id === userId) {
            req.session["currentUser"] = { ...currentUser, ...userUpdates };
        }

        res.json(updatedUser);
    };
    app.put("/api/users/:userId", updateUser);

    // Sign Up User
    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            return res.status(400).json({ message: "Username already in use" });
        }
        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };
    app.post("/api/users/signup", signup);

    // Sign In User
    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);

        if (!currentUser) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };
    app.post("/api/users/signin", signin);

    // Sign Out User
    const signout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    app.post("/api/users/signout", signout);

    // Get Profile
    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            return res.sendStatus(401);
        }
        res.json(currentUser);
    };
    app.post("/api/users/profile", profile);

    // Find All Users
    const findAllUsers = async (req, res) => {
        const { role, name } = req.query;

        try {
            let users;
            if (role) {
                users = await dao.findUsersByRole(role);
            } else if (name) {
                users = await dao.findUsersByPartialName(name);
            } else {
                users = await dao.findAllUsers();
            }
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    app.get("/api/users", findAllUsers);

    // Find User by ID
    const findUserById = async (req, res) => {
        try {
            const user = await dao.findUserById(req.params.userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    app.get("/api/users/:userId", findUserById);

    // Find Courses for Current User
    const findCoursesForUser = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            return res.sendStatus(401);
        }

        try {
            let courses;
            if (currentUser.role === "ADMIN" || currentUser.role === "FACULTY") {
                courses = await courseDao.findAllCourses();
            } else {
                const { uid } = req.params;
                const userId = uid === "current" ? currentUser._id : uid;
                courses = await enrollmentsDao.findCoursesForUser(userId);
            }
            res.json(courses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    app.get("/api/users/:uid/courses", findCoursesForUser);

    // Create a Course
    const createCourse = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        try {
            const newCourse = await courseDao.createCourse(req.body);
            await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
            res.json(newCourse);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    app.post("/api/users/current/courses", createCourse);

    // Delete a User
    const deleteUser = async (req, res) => {
        try {
            const status = await dao.deleteUser(req.params.userId);
            res.json(status);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    app.delete("/api/users/:userId", deleteUser);
}
