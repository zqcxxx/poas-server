const db = require('../db')
const seq = require('sequelize')

const Question = db.defineModel('Question', {
  question_title: seq.STRING(30),
  question_type: seq.BIGINT
})

// 导出模型对象
module.exports = Question
