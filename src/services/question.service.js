const questionModel = require("../models/question.model")

const createQuestion = async (text) => {
    return await questionModel.create({ text })
}

const getQuestions = async () => {
    return await questionModel.find()
}

const getQuestionById = async (id) => {
    return await questionModel.findById(id).exec()
}

const updateQuestion = async (question, text) => {
    question.text = text
    await question.save()
    return question
}

const deleteQuestion = async (id) => {
    return await questionModel.findByIdAndDelete(id).exec()
}

module.exports = {
    createQuestion,
    getQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion
}