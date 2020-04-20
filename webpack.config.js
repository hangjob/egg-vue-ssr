/*
 * @Author: your name
 * @Date: 2020-04-18 23:31:45
 * @LastEditTime: 2020-04-20 23:35:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg\webpack.config.js
 */

module.exports = {
    plugins: [{
        copy: [{
            from: 'app/web/staticExtent',
            to: 'asset/staticExtent'
        }],
    }],
    alias: {
        '@web': 'app/web'
    },
    module: {
        rules: [{
            less: true
        }]
    }
};