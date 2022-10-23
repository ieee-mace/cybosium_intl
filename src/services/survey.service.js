const surveyModel = require("../models/survey.model")

const addSurveyResponse = async ({data, user}) => {
    const responses = await getSurveyResponse(user)
    if(responses) {
        return null
    }
    return await surveyModel.create({
        data,
        user: user._id
    })
}

const getSurveyResponse = async (user) => {
    const survey = await surveyModel.findOne({
        user: user._id
    })
    if(!survey) {
        return null
    }
    return survey
}

const updateSurveyResponse = async ({data, user}) => {
    const survey = await surveyModel.findOne({
        user: user._id
    })
    if(!survey) {
        return null
    }
    survey.data = data
    return await survey.save()
}

const deleteSurveyResponse = async (user) => {
    return await surveyModel.deleteOne({
        user: user._id
    })
}

module.exports = {
    addSurveyResponse,
    getSurveyResponse,
    updateSurveyResponse,
    deleteSurveyResponse
}