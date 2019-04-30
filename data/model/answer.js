const db = require('../db');
const seq = require('sequelize');

const Answer = db.defineModel('Answer', {
    survey_id: seq.BIGINT,
    question_id: seq.BIGINT,
    option_vlaue: seq.BIGINT,
    pid: seq.BIGINT,
    option_iseq: seq.BIGINT,
});

// 导出模型对象
module.exports = Answer;