'use strict';
const egg = require('egg');
module.exports = class IndexController extends egg.Controller {

    async index(ctx) {
        let result = { keywords: '关键词', 'description': '描述字段' };
        await this.ctx.render('index/index.js', result);
    }

};