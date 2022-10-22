const surveyModel = require("../models/survey.model")

const addSurveyResponse = async ({data, user}) => {
    return await surveyModel.create({
        data,
        user: user._id
    })
}

const getSurveyResponses = async (user) => {
    return await surveyModel.find({
        user: user._id
    })
}

module.exports = {
    addSurveyResponse,
    getSurveyResponses
}