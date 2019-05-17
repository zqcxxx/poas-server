const db = require('../db')
const seq = require('sequelize')

const Option = db.defineModel('Option', {
  question_id: seq.BIGINT,
  option_value: seq.CHAR(255)
})

// 导出模型对象
module.exports = Option
