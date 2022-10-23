const { addSurveyResponse, getSurveyResponses } = require("../services/survey.service")

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

const getResponses = async (req, res) => {
    const surveys = await getSurveyResponses(req.user)

    return res.status(200).json({
        success: true,
        surveys
    })
}

module.exports = {
    addResponse,
    getResponses
}