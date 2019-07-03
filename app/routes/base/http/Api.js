module.exports = function () {

    const app = this;
    const RouterHttp = app.getRoute('base.http');

    class RouterHttpApi extends RouterHttp {

        _createRoute (method, path, router, event) {
            router[method](path, event.bind(this))
        }

    }

    return RouterHttpApi;
};