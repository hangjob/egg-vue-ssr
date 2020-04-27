/*
 * @Author: your name
 * @Date: 2020-04-18 23:31:45
 * @LastEditTime: 2020-04-27 22:43:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg\webpack.config.js
 */

module.exports = {
    plugins: [{
        copy: [{
            from: 'app/web/style/public.css',
            to: 'asset/css/public.css'
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