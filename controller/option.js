const Option = require('../data/model/option');

exports.addoption = async ( ctx ) => {
    let data = ctx.request.body;
    let qid = data.id;
    let optvalue = data.value;
    try {
        await Option.create({
            question_id: qid,
            option_value: optvalue,
            status: 0
        });
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
}

exports.getoption = async ( ctx ) => {
    try {
        let params = ctx.params;
        let qid = params.id;
        let ary = [];
        let data = await Option.findAll({
            where: { question_id: qid}
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
            message: '获取失败'
        }
    }
}

exports.deloption = async ( ctx ) => {
    try {
        let data = ctx.params;
        let optid = data.id;
        let delopt =  await Option.findOne({
            where: { id : optid }
        });
        delopt.status = 2;
        delopt.save();
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
}

exports.editoption = async ( ctx ) => {

}
