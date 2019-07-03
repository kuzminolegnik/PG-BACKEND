module.exports = function () {

    const app = this;
    const path = require("path");
    const express = require('express');
    const routeRegexp = new RegExp(/^\[(GET|POST|PUT|DELETE)\](.*)$/, 'i');

    class RouterHttp {

        constructor(config) {
            let me = this,
                router = express.Router(),
                {prefix} = config,
                result;

            for (let key in config) if (config.hasOwnProperty(key)) {
                if (routeRegexp.test(key)) {
                    result = key.match(routeRegexp);

                    if (result[1] && result[2]) {
                        me._createRoute.apply(me, [result[1].toLowerCase(), result[2], router, config[key]]);
                    }
                }
            }

            me._app = app;
            me._prefix = prefix;
            me._router = router;

            app.use(path.join("/", prefix).replace(new RegExp("\\\\", 'g'), "/"), router);
        }

        get app() {
            return this._app;
        }

        get route() {
            return this._router;
        }

        get prefix() {
            return this._prefix;
        }

        _createRoute(method, path, router, event) {}

    }

    return RouterHttp;
};