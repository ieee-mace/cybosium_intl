const router = require('express').Router()

const controller = require('../controllers/question.controller')

router.get("/", controller.getQuestions)
router.get("/:id", controller.getQuestion)
router.post("/", controller.createQuestion)
router.put("/:id", controller.updateQuestion)
router.delete("/:id", controller.deleteQuestion)

module.exports = router