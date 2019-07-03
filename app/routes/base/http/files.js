module.exports = function () {

    const app = this;
    const multipart = require('connect-multiparty');
    const multipartMiddleware = multipart();
    const RouterHttp = app.getRoute('base.http');

    class RouterHttpFiles extends RouterHttp {

        _createRoute (method, path, router, event) {
            router[method](path, multipartMiddleware, event.bind(this))
        }

    }

    return RouterHttpFiles;
};