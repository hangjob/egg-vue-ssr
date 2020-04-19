/*
 * @Author: your name
 * @Date: 2020-04-18 23:37:57
 * @LastEditTime: 2020-04-18 23:39:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg\app\middleware\appInit.js
 */
module.exports = () => {
    return async function locale(ctx, next) {
        console.log('中间件每次访问都会执行')
        await next();
    };
};