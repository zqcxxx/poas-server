const Answer = require('../data/model/answer')

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
