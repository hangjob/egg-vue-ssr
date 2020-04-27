/*
 * @Author: your name
 * @Date: 2020-04-18 23:31:45
 * @LastEditTime: 2020-04-27 22:11:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg\app\web\component\layout\index\index.js
 */
import MainLayout from './main.vue';
import createLayout from '../layout';
export default createLayout(
    'Layout', { MainLayout },
    '<div id="app" data-server-rendered="true"><MainLayout><div slot="main" class="main"><slot></slot></div></MainLayout></div>'
);