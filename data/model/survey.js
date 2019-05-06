const db = require('../db')
const seq = require('sequelize')

const Survey = db.defineModel('Survey', {
  survey_title: seq.STRING(30),
  ispublished: seq.CHAR(2),
  question_id: seq.STRING(255),
  deadline: seq.CHAR(255)
})

// 导出模型对象
module.exports = Survey
