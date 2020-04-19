/*
 * @Author: your name
 * @Date: 2020-04-18 23:31:45
 * @LastEditTime: 2020-04-19 11:02:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg\app\controller\detail\detail.js
 */
'usestrict';
const egg = require('egg');
module.exports = class IndexController extends egg.Controller {

    async index(ctx) {
        const { id } = ctx.params;
        const result = { keywords: '详情关键词', id: id, description: '详情描述' };
        await this.ctx.render('detail/index.js', result);
    }

};