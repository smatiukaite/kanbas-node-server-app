// import db from "../Database/index.js";
import model from "./model"
// let { users } = db;

export const createQuiz = (quiz) => {
    delete quiz._id;
    return model.create(quiz);
};

export const createQuestion = (question) => {
    delete question._id;
    return model.create(question);
};

export const findAllQuizzes = () => model.find();
//filter docs by primary key
export const findQuizById = (quizId) => model.findById(quizId);
//finds the document that matches the userId
export const findQuizByUserId = (userId) => model.findOne({ userId: userId });
//find by username and password
// export const findQuizByCredentials = (username, password) => model.findOne({ username, password });
//update 
export const updateQuiz = (quizId, quiz) => model.updateOne({ _id: quizId }, { $set: quiz });
export const updateQuiz2 = (quizId, quiz) => model.findByIdAndUpdate(quizId, quiz, {new: true});
export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });

// QUESTIONS
export const updateQuestion = (questionId, question) => model.updateOne({ _id: questionId }, { $set: question });
export const deleteQuestion = (questionId) => model.deleteOne({ _id: questionId });
