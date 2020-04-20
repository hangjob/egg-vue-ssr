/*
 * @Author: your name
 * @Date: 2020-04-18 23:31:45
 * @LastEditTime: 2020-04-20 23:21:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg\app\web\framework\plugin\index.js
 */
'use strict';
import request from 'framework/network/request';
import VueI18n from 'vue-i18n';
import createI18n from 'framework/i18n/site';

export default {
    install(Vue) {
        if (!Vue.prototype.hasOwnProperty('$request')) {
            Vue.prototype.$request = request;
        }
        if (!Vue.hook) {
            Vue.use(VueI18n);
            Vue.hook = {
                render(context, options) {
                    const i18n = createI18n(context.state.locale);
                    options.i18n = i18n;
                }
            };
        }
    }
};