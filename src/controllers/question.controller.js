const mongoose = require("mongoose")
const questionService = require('../services/question.service')

const createQuestion = async (req, res) => {
    const { text } = req.body
    if(!text) {
        return res.status(400).json({
            success: false,
            message: "Required [text]"
        })
    }
    const question = await questionService.createQuestion(text)
    return res.status(201).json({
        success: true,
        message: "Question Added",
        question
    })
}

const getQuestion = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Id"
        })
    }

    const question = await questionService.getQuestionById(id)
    if(!question) {
        return res.status(404).json({
            success: false,
            message: "Question Not Found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Question Found",
        question
    })
}

const getQuestions = async (req, res) => {
    const questions = await questionService.getQuestions()
    if(!questions || questions.length == 0) {
        return res.status(404).json({
            success: false,
            message: "No Questions Found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Questions Found",
        questions
    })
}

const updateQuestion = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Id"
        })
    }

    const { text } = req.body
    if(!text) {
        return res.status(400).json({
            success: false,
            message: "Required [text]"
        })
    }
    const question = await questionService.getQuestionById(id)
    if(!question) {
        return res.status(404).json({
            success: false,
            message: "Question Not Found"
        })
    }
    await questionService.updateQuestion(question, text)

    return res.status(200).json({
        success: true,
        message: "Question Updated",
        question
    })
}

const deleteQuestion = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Id"
        })
    }

    const question = await questionService.deleteQuestion(id)
    if(!question) {
        return res.status(404).json({
            success: false,
            message: "Question Not Found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Question Deleted",
        question
    })
}

module.exports = {
    createQuestion,
    getQuestion,
    getQuestions,
    updateQuestion,
    deleteQuestion
}