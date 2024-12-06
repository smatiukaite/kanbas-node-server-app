// import db from "../Database/index.js";
// let { users } = db;
import model from "./model.js";
export const createUser = (user) => {
    delete user._id;
    return model.create(user);
};

export const findAllUsers = () => model.find(); // select * from users;
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>
    model.findOne({ username: username }); // or users.findOne({ username });
export const findUserByCredentials = (username, password) =>
    model.findOne({ username: username, password: password });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });

export const findUsersByRole = (role) => model.find({ role: role }); // or just model.find({ role })
export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
        $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
};

export const findUsersLastActivity = (lastActivity) => model.find({ lastActivity: lastActivity });
export const updateUser = (userId, user, email, role) => 
    model.updateOne({ _id: userId }, { $set: user }, {email: email}, {role: role});