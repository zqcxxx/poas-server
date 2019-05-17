const Answer = require('../data/model/answer')
const Question = require('../data/model/question')
const Option = require('../data/model/option')
const Survey = require('../data/model/survey')

// 将用户提交答案存入Answer表中
exports.submitanswer = async (ctx) => {
  try {
    let data = ctx.request.body
    let sid = Number(data.id)
    let ans = data.data
    // 将单选、多选、填空答案分别取出
    let sqAnswer = ans[0]
    let mulAnswer = ans[1]
    let fiiAnswer = ans[2]
    // 在Answer表中查找当前答案，并计数加1
    // 单选题处理
    for (let s of sqAnswer) {
      let sq = await Answer.findOne({
        where: { survey_id: sid, question_id: s.id, option_value: s.answer }
      })
      sq.pid++
      sq.save()
    }
    // 多选题处理
    for (let m of mulAnswer) {
      for (let n of m.answer) {
        let mq = await Answer.findOne({
          where: { survey_id: sid, question_id: m.id, option_value: n }
        })
        mq.pid++
        mq.save()
      }
    }
    // 填空题插入新纪录，通过sid、qid进行检索
    for (let f of fiiAnswer) {
      await Answer.create({
        survey_id: sid,
        question_id: f.id,
        option_value: f.answer,
        status: 0,
        pid: 0
      })
    }
    ctx.body = {
      status: 0,
      message: '提交成功'
    }
  } catch (error) {
    ctx.body = {
      status: 1,
      message: '提交失败'
    }
  }
}

exports.getanswer = async (ctx) => {
  try {
    // 将问题分为两类，选择和填空
    let ansarray = [[], []]
    let sid = Number(ctx.params.id)
    // 获取当前问卷
    let sur = await Survey.findOne({
      where: { id: sid }
    })
    // 拿到该问卷所有问题id
    let qid = sur.question_id.split(',')
    // 遍历id
    for (let q of qid) {
      // qd用来存问题的对象信息
      let qd = {}
      let sq = await Question.findOne({
        where: { id: q }
      })
      qd.id = sq.dataValues.id
      qd.title = sq.dataValues.question_title
      qd.options = []
      qd.type = sq.dataValues.question_type
      if (qd.type === 2) {
        qd.ans = []
        let fillContent = await Answer.findAll({
          where: { survey_id: sid, question_id: qd.id }
        })
        for (let c of fillContent) {
          qd.ans.push(c.dataValues.option_value)
        }
        ansarray[1].push(qd)
      } else {
        let sqo = await Option.findAll({
          where: { question_id: q, status: 0 }
        })
        for (let o of sqo) {
          let op = {}
          op.id = o.id
          op.value = o.option_value
          let cobj = await Answer.findOne({
            where: { survey_id: sid, question_id: q, option_value: `${o.id}` }
          })
          op.count = cobj.pid
          qd.options.push(op)
        }
        ansarray[0].push(qd)
      }
    }
    ctx.body = {
      status: 0,
      message: '获取成功',
      data: ansarray
    }
  } catch (error) {
    ctx.body = {
      status: 1,
      message: '获取失败'
    }
  }
}
