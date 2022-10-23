const { addSurveyResponse, getSurveyResponse, updateSurveyResponse, deleteSurveyResponse } = require("../services/survey.service")

const addResponse = async (req, res) => {
    const { data } = req.body

    if(!data) {
        return res.status(400).json({
            success: false,
            message: "Required [data]"
        })
    }

    const survey = await addSurveyResponse({data, user: req.user})

    if(!survey) {
        return res.status(400).json({
            success: false,
            message: "Multiple Responses Not Allowed"
        })
    }

    return res.status(200).json({
        success: true,
        survey
    })
}

const getResponse = async (req, res) => {
    const survey = await getSurveyResponse(req.user)
    if(!survey) {
        return res.status(400).json({
            success: false,
            message: "Survey Not Found"
        })
    }

    return res.status(200).json({
        success: true,
        survey
    })
}

const updateResponse = async (req, res) => {
    const { data } = req.body

    if(!data) {
        return res.status(400).json({
            success: false,
            message: "Required [data]"
        })
    }

    const survey = await updateSurveyResponse({data, user: req.user})
    if(!survey) {
        return res.status(400).json({
            success: false,
            message: "Couldn't Update Response"
        })
    }

    return res.status(200).json({
        success: true,
        message: "Response Updated",
        survey
    })
}

const deleteResponse = async (req, res) => {
    const surveyResponse = await deleteSurveyResponse(req.user)
    if(surveyResponse.deletedCount == 0) {
        return res.status(400).json({
            success: false,
            message: "Couldn't Delete Response"
        })
    }

    return res.status(200).json({
        success: true,
        message: "Response Deleted",
    })
}

module.exports = {
    addResponse,
    getResponse,
    updateResponse,
    deleteResponse
}