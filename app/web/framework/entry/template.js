/*
 * @Author: your name
 * @Date: 2020-04-18 23:31:45
 * @LastEditTime: 2020-04-20 23:21:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg\app\web\framework\entry\template.js
 */
import Layout from 'component/layout/index';
import plugin from 'framework/plugin';

export default function(Vue) {
    Vue.use(plugin);
    Vue.component(Layout.name, Layout);
}