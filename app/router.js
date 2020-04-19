'use strict';
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.index.index.index);
    router.get('/detail/:id.html', controller.detail.detail.index);
    router.get('/index(.+)?', controller.index.index.index);
};