/*
 * @Author: your name
 * @Date: 2020-04-18 23:31:45
 * @LastEditTime: 2020-04-27 22:44:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg\app\web\framework\entry\template.js
 */
import Layout from 'component/layout/index';
import plugin from 'framework/plugin';
import pieceCard from 'component/pieceCard.vue';
import AtComponents from 'at-ui';
export default function(Vue) {
    Vue.use(AtComponents)
    Vue.use(plugin);
    Vue.component(Layout.name, Layout);
    Vue.component('pieceCard', pieceCard);
}