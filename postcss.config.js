/*
 * @Author: your name
 * @Date: 2020-04-20 22:55:03
 * @LastEditTime: 2020-04-20 23:12:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg\postcss.config.js
 */
module.exports = {
    plugins: {
        "postcss-px2rem": {
            remUnit: 100, // 100px = 1rem
            remPrecision: 2 // rem的小数点后位数
        }
    }
}