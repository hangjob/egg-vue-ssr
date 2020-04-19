import MainLayout from './main.vue';
import createLayout from '../layout';
import '@web/style/index.css'

export default createLayout(
    'Layout', { MainLayout },
    '<div id="app" data-server-rendered="true"><MainLayout><div slot="main" class="main"><slot></slot></div></MainLayout></div>'
);