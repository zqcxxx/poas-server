const Survey =  require('../data/model/survey')

exports.getsurveys = async (ctx) => {
    try {
        let ary = [];
        let params =  ctx.params;
        let pg = Number(params.pg);
        let num = Number(params.num);
        let ofs = (pg - 1) *num;
        let data = await Survey.findAll({
            offset: ofs,
            limit: num,
            where: {status: 0},
        });
        for(let t of data){
            ary.push(t.dataValues)
        }
        ctx.body = {
            status: 0,
            message: '获取成功',
            data: ary
        }       
    } catch (error) {
        ctx.body = {
            status: 1,
            message: '获取失败',
            data: []
        }        
    }
};

exports.delsurvey = async (ctx) => {
    try {
        let params = ctx.params;
        let did = params.id;
        let delsurvey = await Survey.findOne({
            where: {id : did}
        })
        delsurvey.status = 2;
        delsurvey.save();
        ctx.body = {
            status: 0,
            message: '删除成功'
        }
    } catch (error) {
        ctx.body = {
            status: 1,
            message: '删除失败'
        }
    }
};

exports.addsurvey = async (ctx) => {
    try {
        let data = ctx.request.body;
        let surtitle = data.title;
        let qid = (data.questionid).join(',');
        let dl = data.deadline; 
        await Survey.create({
            survey_title: surtitle,
            ispublished: 1,
            question_id: qid,
            deadline: dl,
            status: 0
        })
        ctx.body = {
            status: 0,
            message: '添加成功'
        }       
    } catch (error) {
        ctx.body = {
            status: 1,
            message: '添加失败'
        }
    }
};

exports.editsurvey = async (ctx) => {};

exports.getsurvey = async (ctx) => {
    try {
        let params = ctx.params;
        let sid = params.id;
        let surdata =  await Survey.findOne({
            where: { id: sid}
        });
        ctx.body = {
            status: 0,
            messgage: '查找成功',
            data: surdata,
        }
    } catch (error) {
        ctx.body = {
            status: 1,
            message: '查找失败',
            data: []
        }
    }
};
