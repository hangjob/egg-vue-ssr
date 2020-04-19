/*
 * @Author: your name
 * @Date: 2020-04-18 23:31:45
 * @LastEditTime: 2020-04-19 23:11:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg\webpack.config.js
 */

const webpack = require('webpack')
module.exports = {
    plugins: [{
            copy: [{
                from: 'app/web/framework/webui',
                to: 'asset/webui'
            }],
        },
        new webpack.LoaderOptionsPlugin({     vue: {       postcss: [require('postcss-px2rem')({ remUnit: 75, propWhiteList: [] })]     }   })
    ],
    alias: {
        '@web': 'app/web'
    },
    module: {
        rules: [{
            less: true
        }]
    }
};